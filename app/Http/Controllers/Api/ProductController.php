<?php

namespace App\Http\Controllers\Api;

use App\Models\Farm;
use App\Models\User;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\SupportedProduct;
use App\Models\TransactionDetail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function allProducts()
    {
        // $user =User::query()->paginate(4);
        $products = Product::query()->paginate(8);
        return ProductResource::collection($products);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getFarmInfobyUser(Request $request)
    {

        $user_ID = Crypt::decryptString($request->user_ID);

        $farmsOwnedByUser = Farm::where("farm_owner",  $user_ID)->get();
        return response([
            'farmsOwned' => $farmsOwnedByUser,
            'userID' => $user_ID,
        ]);
    }


    public function getOrderLists(Request $request)
    {
        //     $user_ID = Crypt::decryptString($request->user_ID);

        //     $farmsOwnedByUser = Farm::where("farm_owner",  $user_ID)->get();
        //     foreach($farmsOwnedByUser as $farmOwnedByUser){
        //         $i=0;
        //         $transactions = Transaction::where("from_farm", $farmOwnedByUser->id)->get();
        //         foreach ($transactions as $transaction){
        //             $transactionDetails[] = TransactionDetail::where("transaction_id", $transaction->id)->get();
        //         }
        //     }
        //    return response([
        //     'farmsOwned' => $farmsOwnedByUser,
        //     'transactions' => $transactions,
        //     'transaction_Details' => $transactionDetails,
        //    ]);
        // $user_ID = Crypt::decryptString($request->user_ID);
        // $farmsOwnedByUser = Farm::where("farm_owner",  $user_ID)->get();
        // $farmData = [];
        // foreach ($farmsOwnedByUser as $farm) {
        //     $farmTransactions = Transaction::where("from_farm", $farm->id)->get();
        //     $transactionsData = [];
        //     foreach ($farmTransactions as $transaction) {
        //         $transactionDetails = TransactionDetail::where("transaction_id", $transaction->id)->get();
        //         $transactionsData[] = [
        //             'transaction' => $transaction,
        //             'transaction_details' => $transactionDetails,
        //         ];
        //     }
        //     $farmData[] = [
        //         'farm' => $farm,
        //         'transactions' => $transactionsData,
        //     ];
        // }

        // return response()->json([
        //     'farmsOwnedByUser' => $farmData,
        //     'userID' => $user_ID,
        // ]);
        $user_ID = Crypt::decryptString($request->user_ID);
        $farmsOwnedByUser = Farm::where("farm_owner",  $user_ID)->get();
        $farmData = [];

        foreach ($farmsOwnedByUser as $farm) {
            $farmTransactions = Transaction::where("from_farm", $farm->id)->get();
            $transactionsData = [];

            foreach ($farmTransactions as $transaction) {
                // Access the user_id from the buyers_name in the transaction
                $buyerUser = User::find($transaction->buyers_name);

                $transactionDetails = TransactionDetail::where("transaction_id", $transaction->id)->get();
                $transactionsData[] = [
                    'transaction' => $transaction,
                    'buyer_user' => $buyerUser,
                    'transaction_details' => $transactionDetails,
                ];
            }

            $farmData[] = [
                'farm' => $farm,
                'transactions' => $transactionsData,
            ];
        }

        return response()->json([
            'farmsOwnedByUser' => $farmData,
        ]);
    }

    public function addProduct(Request $request)
    {
        $data = $request->user_ID;

        $user_ID = Crypt::decryptString($data);;
        // echo $data;
        // echo $user_ID ;
        // echo "sjkahsjagsjhaghj";
    }






    public function getProductTypes()
    {
        $productType = SupportedProduct::all();
        return response([
            'productType' => $productType,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
