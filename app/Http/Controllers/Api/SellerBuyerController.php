<?php

namespace App\Http\Controllers\api;

use App\Models\Farm;
use App\Models\User;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\TransactionDetail;
use App\Http\Controllers\Controller;
use  Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Crypt;


class SellerBuyerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function farmWProducts(Request $request){

        $user_ID = Crypt::decryptString($request->user_ID);

        $farm = Farm::where('farm_owner', $user_ID)
                    ->with(['products' => function ($query) {
                        $query->orderBy('created_at', 'desc');
                    }, 'user'])
                    ->get();

        return response()->json($farm);
    }

    public function getProductToOrder($product){
      $product =  Product::where('id', $product)
        ->with('farm')
        ->get();

        return response()->json($product);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addToCart(Request $request)
    {
        $user_ID = Crypt::decryptString($request->user_ID);
        $product = Product::where('id', $request->productID_)->first();

        $newTransaction  = Transaction::create([
            'ordered_on' => now(),
            'price_of_goods' => $product->price,
            'buyers_name' => $user_ID,
            'from_farm' => $product->farm_belonged,
        ]);

        $cost = $product->price * $request->kg_ ;
        TransactionDetail::create([
            'product_name' => $product->product_name,
            'product_type' => $product->product_type,
            'variety' => $product->variety,
            'planted_date' => $product->planted_date,
            'harvested_date' => $product->harvested_date,
            'kg_purchased' => $request->kg_,
            'price_per_kilo' => $product->price,
            'total_price' => $cost,
            'transaction_id' => $newTransaction->id,
        ]);
        $kgTotal =  $product->actual_sold_kg + $request->kg_;
        $kgTotal2 = $product->actual_harvested_in_kg - $request->kg_;

        $product->update([
           'actual_sold_kg' => $kgTotal,
            'actual_harvested_in_kg' => $kgTotal2,
        ]);
        return response()->json("sucesss");
    }

    public function getPendingOrders(Request $request)
    {
        $user_ID = Crypt::decryptString($request->user_ID);
        // $farmsOwnedByUser = Farm::where("farm_owner",  $user_ID)->get();
        // $farmData = [];
        // foreach ($farmsOwnedByUser as $farm) {
        //     $farmTransactions = Transaction::where("from_farm", $farm->id)->where("price_payed", ">=",  0)->get();
        //     $transactionsData = [];

        //     foreach ($farmTransactions as $transaction) {
        //         // Access the user_id from the buyers_name in the transaction
        //         $buyerUser = User::find($transaction->buyers_name);

        //         $transactionDetails = TransactionDetail::where("transaction_id", $transaction->id)->get();
        //         $transactionsData[] = [
        //             'transaction' => $transaction,
        //             'buyer_user' => $buyerUser,
        //             'transaction_details' => $transactionDetails,
        //         ];
        //     }

        //     $farmData[] = [
        //         'farm' => $farm,
        //         'transactions' => $transactionsData,
        //     ];

        //     return response()->json($farmData);
        // }

        // ----
        $userPendingOrders = User::where('id', $user_ID)
        ->whereHas('transactions', function ($query) {
            $query->where('payed_on', null);
        })
        ->with('transactions.TransactionDetail')
        ->get();

        return response()->json([
            'userPendingOrders' => $userPendingOrders,
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
