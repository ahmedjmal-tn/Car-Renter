<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripeController extends Controller
{
    public function processpayment(Request $request)
    {
        try { 
            // Configure Stripe API key
            Stripe::setApiKey(env('STRIPE_SECRET'));

            // Create a Stripe Checkout Session
            $session = Session::create([
                'payment_method_types' => ['card'], // Ensure "card" is used as payment method
                'line_items' => $request->input('line_items'),
                'mode' => 'payment',
                'success_url' => $request->input('success_url'),
                'cancel_url' => $request->input('cancel_url'),
            ]);

            return response()->json(['id' => $session->id], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
