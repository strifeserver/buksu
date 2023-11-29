<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Farm;
use App\Models\TransactionDetail;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Crypt;
use App\Services\MailService;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $status = 0;
        $code = 400;
        // try {
            $user_ID = Crypt::decryptString($request->user_ID);
            $cartItems = explode(',', $request->cart_id);
    
            $cartItemsCart = Cart::whereIn('id', $cartItems)->where('user_id',$user_ID)->get();
            if(count($cartItemsCart) > 0){
                $User = User::where('id','=',$user_ID)->first();
                foreach ($cartItemsCart as $cartItem_id) {
                  
                    $product = Product::where('id', $cartItem_id->product_id)->first();
             

                    $seller = Farm::where('id', $product->farm_belonged)->first();
        
                    //Notification
                    // if($seller){
                    //     if($seller->email){
                    //         $EmailService = app(MailService::class);
                    //         $body = 'an Order has been created successfully';
                    //         $execution = $EmailService->send($seller->email, 'Order Created', $body, '', '', '', []);
                    //     }
                    // }
         
                    // $buyer = User::where('id','=',$user_ID)->first();
                    // if($buyer){
                    //     if($buyer->email){
                    //         $EmailService = app(MailService::class);
                    //         $body = 'you have placed an Order Successfully';
                    //         $execution = $EmailService->send($seller->email, 'Order Created', $body, '', '', '', []);
                    //     }
                    // }
                    //Notification
        
                    $newTransaction  = Transaction::create([
                        'seller' => $seller->farm_owner,
                        'ordered_on' => now(),
                        'price_of_goods' => $product->price * $request->kg_,
                        'buyers_name' => $user_ID,
                        'from_farm' => $product->farm_belonged,
            
                    ]);
            
                    $cost = $product->price * $request->kg_;
                    TransactionDetail::create([
                        'product_id' => $product->id,
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
                    $removeCartItem = Cart::find($cartItem_id->id);
        
                    if ($removeCartItem) {
                        $removeCartItem->delete();
                    } 
                    
                }
    
                $status = 1;
                $code = 200;
            }else{
                $status = 0;
                $code = 400;


            }
        // } catch (\Throwable $th) {
        //     //throw $th;
        //     $status = 0;
        //     $code = 400;

        // }

 
        return response(json_encode(['status'=>$status]), $code)->header('Content-Type', 'application/json');
    }
}
