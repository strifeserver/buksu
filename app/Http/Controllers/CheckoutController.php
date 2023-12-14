<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Farm;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\User;
use App\Services\MailService;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $status = 0;
        $code = 400;
        $mailingList = [];
        $mailerInfo = [];

        $orderIdBatch = DB::table('transactions')->max('id') + 1;
        // Generate a unique identifier (using uniqid with more_entropy to increase uniqueness)
        $uniqueId = uniqid('', true);

        // Combine the components to create the alphanumeric order ID
        $OrderIDbatch = $uniqueId.$orderIdBatch;


        // try {
            $user_ID = Crypt::decryptString($request->user_ID);
            $cartItems = explode(',', $request->cart_id);

            $cartItemsCart = Cart::whereIn('id', $cartItems)->where('user_id', $user_ID)->get();
            if (count($cartItemsCart) > 0) {
                $User = User::where('id', '=', $user_ID)->first();
                foreach ($cartItemsCart as $cartItem_id) {

                    $product = Product::where('id', $cartItem_id->product_id)->first();

                    $seller = Farm::where('id', $product->farm_belonged)->first();
                    //Notification
                    $buyer = User::where('id', '=', $user_ID)->first();
                    $sellerAcct = User::where('id', '=', $seller->farm_owner)->first();
                    if (!empty($sellerAcct)) {

                        if ($sellerAcct->email) {
                            $mailingList[] = $sellerAcct->email;
                            $EmailService = app(MailService::class);
                            $body = 'you have placed an Order Successfully from the farm: ' . $seller->farm_name;

                            $sendtoSeller = [
                                'email' => $sellerAcct->email,
                                'body' => $body,
                                'role' => 'seller',
                                'user_id' => $sellerAcct->id,
                            ];

                            $mailerInfo[] = $sendtoSeller;
                        }
                    }

                    if (!empty($buyer)) {
                        $mailingList[] = $buyer->email;

                        if ($buyer->email) {
                            $EmailService = app(MailService::class);
                            $body = 'an Order has been created successfully Buyer:' . $buyer->name;

                            $sendtoBuyer = [
                                'email' => $buyer->email,
                                'body' => $body,
                                'role' => 'buyer',
                                'user_id' => $buyer->id,
                            ];

                            $mailerInfo[] = $sendtoBuyer;
                        }
                    }
                    //Notification

                    $kgTotal = $product->actual_sold_kg + $cartItem_id->kg_added;
                    $kgTotal2 = $product->actual_harvested_in_kg - $cartItem_id->kg_added;

                    $transactionArr = [
                        'ordered_on' => now(),
                        'price_of_goods' => $product->price * $cartItem_id->kg_added,
                        'buyers_name' => $user_ID,
                        'seller' => $product->farm_belonged,
                        'from_farm' => $product->farm_belonged,
                        'order_id' => $OrderIDbatch,

                    ];

                    $newTransaction = Transaction::create($transactionArr);

                    $cost = $product->price * $cartItem_id->kg_added;
                    TransactionDetail::create([
                        'product_id' => $product->id,
                        'product_name' => $product->product_name,
                        'order_id' => $OrderIDbatch,
                        'variety' => $product->variety,
                        'planted_date' => $product->planted_date,
                        'harvested_date' => $product->harvested_date,
                        'kg_purchased' => $cartItem_id->kg_added,
                        'price_per_kilo' => $product->price,
                        'total_price' => $cost,
                        'transaction_id' => $newTransaction->id,

                    ]);

                    $product->update([
                        'actual_sold_kg' => $kgTotal,
                        'actual_harvested_in_kg' => $kgTotal2,
                    ]);
                    $removeCartItem = Cart::find($cartItem_id->id);

                    if ($removeCartItem) {
                        $removeCartItem->delete();
                    }

                }

                foreach ($mailerInfo as $key => $value) {
                    $execution = $EmailService->send($value['email'], 'Order Created', $value['body'], '', '', '', []);
                }

                $status = 1;
                $code = 200;
            } else {
                $status = 0;
                $code = 400;

            }
        // } catch (\Throwable $th) {
        //     //throw $th;
        //     $status = 0;
        //     $code = 400;

        // }

        return response(json_encode(['status' => $status]), $code)->header('Content-Type', 'application/json');
    }
}
