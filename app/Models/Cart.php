<?php

namespace App\Models;

use Crypt;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'added_on',
        'kg_added',
        'user_id',
        'product_id',
    ];

    public function display_fields($mode = null)
    {

        $fields = [
            'kg_added',
            'user_id',
            'product_id',
            'products.product_name',
            'products.product_type',
            'products.variety',
            'products.planted_date',
            'products.prospect_harvest_in_kg',
            'products.prospect_harvest_date',
            'products.actual_harvested_in_kg',
            'products.actual_sold_kg',
            'products.harvested_date',
            'products.product_location',
            'products.price',
            'products.product_picture',
            'products.is_approved',
            'users.id as userid',
            'users.name',
        ];

        $amibiguous_fields = [
            'carts.id',
            'carts.created_at',
            'carts.updated_at',
        ];
        $shopify_account_fields = [
            'products.product_name',
            'products.type',
            'products.variety',
            'products.planted_date',
            'products.prospect_harvest_in_kg',
        ];
        if ($mode == 1) {
            $detail_fields = [];
            $detail_fields['amibiguous_fields'] = $amibiguous_fields;
            $detail_fields['main_fields'] = $fields;
            $detail_fields['joined_fields'][] = $shopify_account_fields;

            $fields = $detail_fields;

        } else {
            $fields = array_merge($amibiguous_fields, $fields);
        }
  
        return $fields;
    }

    public function index(array $data): array
    {

        $returns = [];
        $items_per_page = @$data['items_per_page'];
        $pagination = @$data['pagination'];
        $filter = is_string($data['filters']) ? json_decode($data['filters'], true) : ($data['filters'] ?? []);
        if (isset($data['sort']) && gettype(($data['sort'])) == 'string') {
            $sort = @json_decode($data['sort'], true) ?? [];
        } else {
            $sort = $data['sort'] ?? [];
        }

        $others = $data['others'] ?? [];

        #default newest_to_oldest
        if (empty($sort) || empty($sort['created_at'])) {
            $sort['created_at'] = ['sort_by' => 'descending'];
        }

        $fields = $this->display_fields();

        if (!empty($data['others'])) {
            $field_displays_list = $data['others']['fields_displays']['field_lists'];
            $field_display_type = $data['others']['fields_displays']['type'];
            if ($field_display_type == 'follow_list') {
                $fields = $field_displays_list;
            } else if ($field_display_type == 'add_list') {
                $fields = array_merge($fields, $field_displays_list);
            }
        }

        $selected_fields = @$data['fieldnames'];

        if (!empty($selected_fields)) {
            $fields = $selected_fields;
        }
   
        $query = $this->select($fields);

        if (!empty($filter)) {
            $query = $this->applyFilters($query, $filter);
        }

        if (!empty($sort)) {
            $query = $this->applySorting($query, $sort);
        }
        $query->leftJoin('products', 'carts.product_id', '=', 'products.id');
        $query->leftJoin('farms', 'farms.id', '=', 'products.farm_belonged');
        $query->leftJoin('users', 'users.id', '=', 'farms.farm_owner');
        if ($pagination == 1) {
            $result = $query->paginate($items_per_page)->toArray();
        } else {
            $result = $query->get()->toArray();
        }
        $returns['status'] = 1;
        $returns['data'] = @$result;

        return $returns;
    }

    private function applySorting($query, $sortModel)
    {
        foreach ($sortModel as $key => $value) {
            switch ($value['sort_by']) {
                case 'ascending':
                    $query->orderBy($key, 'ASC');
                    break;
                case 'descending':
                    $query->orderBy($key, 'DESC');
                    break;
            }
        }
        return $query;
    }

    private function applyFilters($query, $filters)
    {
        $iterationCount = 0;
        foreach ($filters as $key => $value) {
            $dataType = 'array';
            $filterType = 'like';

            if (is_object($value)) {
                $dataType = 'object';
                $find_value = $value->filter;
                $filterType = $value->filter_type ?? 'like';

            }
            if (is_array($value)) {
                $dataType = 'array';
                $find_value = $value['filter'];
                $filterType = $value['filter_type'] ?? 'like';
            }

            switch ($key) {
                case 'all':
                    $count = 0;
                    $fields = $this->display_fields();

                    try {
                        //code...
                        $attributes = ['fields' => $fields, 'search_value' => @$value['filter'] ?? @$value->filter];

                    } catch (\Throwable $th) {
                        $attributes = ['fields' => $fields, 'search_value' => @$value->filter ?? @$value['filter']];
                        //throw $th;
                    }
                    $query->where(function ($query) use ($attributes) {
                        $fields = $attributes['fields'];
                        $search_value = $attributes['search_value'];
                        $searched_fields = [];
                        foreach ($fields as $field_values) {
                            $raw_field_names = explode('.', $field_values);
                            $searched_fields[] = $field_values . ' == ' . $search_value;

                            $check_alias = explode(' as ', $raw_field_names[0]);
                            if (!empty($check_alias[1])) {
                                $tbl_name = $raw_field_names[0];
                                $field = $check_alias[0];
                                $field_values = $tbl_name . '.' . $field;
                            }
                            $query->orWhere($field_values, 'LIKE', '%' . $search_value . '%');
                        }
                    });
                    break;
                case 'user_id';
                    $user_ID = Crypt::decryptString($value['filter']);
                    $query->where($key, '=', $user_ID);

                    break;
                case 'created_at';
                    try {
                        $from = date('Y-m-d', strtotime($value->from));
                        $to = date('Y-m-d', strtotime($value->to));
                        $from = $from . ' 00:00:00';
                        $to = $to . ' 23:59:59';
                        $query->whereBetween('created_at', [$from, $to]);
                    } catch (\Throwable $th) {
                        // handle the error
                    }
                    break;
                case 'updated_at';
                    try {
                        $from = date('Y-m-d', strtotime($value->from));
                        $to = date('Y-m-d', strtotime($value->to));
                        $from = $from . ' 00:00:00';
                        $to = $to . ' 23:59:59';
                        $query->whereBetween('updated_at', [$from, $to]);
                    } catch (\Throwable $th) {
                        // handle the error
                    }
                    break;
                default:
                    if ($key == 'id' && !is_numeric($find_value)) {
                        $validate_search = 0;
                    } else {
                        $validate_search = 1;
                    }

                    if ($validate_search) {
                        switch ($filterType) {
                            case 'optional':
                                $query->Orwhere($key, 'LIKE', '%' . $find_value . '%');
                                break;

                            default:
                                $query->where($key, 'LIKE', '%' . $find_value . '%');

                                break;
                        }

                    }
                    break;
            }
        }
        $iterationCount++;
        return $query;
    }

    // /**
    //  * @return array
    //  * @param array $request
    //  */
    public function store(array $request): array
    {
        $returns = [];
        $id = optional($request)->get('id', '');
        $fields = $this->fillable;
        $submittedData = collect($request)->only($fields)->toArray();

        $execute = $this::create($submittedData)->id;

        $executeStatus = (is_integer($execute)) ? 1 : 0;
        $returns['status'] = $executeStatus;
        $returns['data_id'] = $execute;

        return $returns;
    }

    public function edit($id): array
    {

        $returns = [];
        $identifiers = ['id'];
        $displayableFields = [];
        $search_vals = ['identifiers' => $identifiers, 'value' => $id];
        // $fields = $this->display_fields();
        $fields = $this->fillable;
        $fieldraw = [];

        $selected_fields = @$data['fieldnames'];

        if (!empty($selected_fields)) {
            $fields = $selected_fields;
        }
        $fields[] = 'id';
        $execute = $this->select($fields);

        $filter = [];

        for ($i = 0; $i < count($identifiers); $i++) {
            $filter[$identifiers[$i]] = ['filter' => $id];
        }

        if (!empty($filter)) {
            $execute = $this->applyFilters($execute, $filter);
        }

        if (!empty($sort)) {
            $execute = $this->applySorting($execute, $sort);
        }

        if ($execute) {

            $execute = $execute->first();
            if ($execute) {
                $execute = $execute->toArray();
            }

        }
        $executeStatus = ($execute) ? 1 : 0;
        $returns['status'] = $executeStatus;
        $returns['data'] = @$execute;
        return $returns;
    }

    // /**
    //  * @return array
    //  * @param array $request
    //  */
    public function execute_update($request): array
    {
        // $id = $request['id'] ?? $request->input('id');
        $id = isset($request['id']) ? $request['id'] : null;
        $identifier = isset($request['identifier']) ? $request['identifier'] : null;
        $fields = $this->fillable;

        $data = $this->where('id', $id)->first();

        $request = collect($request);
        if ($data) {
            $submittedData = $request->only($fields);
            $beforeUpdate = $data->toArray();
            $submittedUpdate = $submittedData->toArray();
            $execute = $data->update($submittedUpdate);
            $auditing = null; // no update auditing defined
        } else {
            return [
                'message' => 'data does not exist',
                'code' => 404,
                'result' => null,
                'status' => 0,
            ];
        }

        return [
            'status' => $execute ? 1 : 0,
            'code' => 200,
            'result' => [
                'data_id' => $data->id,
            ],
        ];
    }

    // /**
    //  * @return array
    //  * @param integer $id
    //  */
    public function execute_destroy($id)
    {
        $response = [];
        $success = false;

        $id = $id ?? '';

        if (!empty($id)) {
            try {
                $data = $this->findOrFail($id);
                $beforeUpdate = $data->toArray();
                $success = $data->delete();
            } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
                $response['status'] = 0;
                $response['result'] = 'Data does not exist';
                return $response;
            }
        }

        $status = ($success) ? 1 : 0;
        $code = ($success) ? 200 : 400;
        $response['status'] = $status;
        $response['code'] = $code;
        $response['data_id'] = @$data->id;
        return $response;
    }
    public function getOrderCreatedAtAttribute($value)
    {
        return date('Y-m-d h:i:s A', strtotime($value));
    }

    public function getUpdatedAtAttribute($value)
    {
        return date('Y-m-d h:i:s', strtotime($value));
    }
    public function getCreatedAtAttribute($value)
    {
        return date('Y-m-d h:i:s', strtotime($value));
    }
    public function setAddedOnAttribute($value)
    {
        $this->attributes['added_on'] = date('Y-m-d h:i:s');
    }
}
