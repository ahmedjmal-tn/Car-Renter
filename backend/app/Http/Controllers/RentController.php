<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rent;
use App\Models\User;
use App\Models\Car;
use App\Models\CarAvailability;
use App\Models\Maintenance;
use Exception;
use Illuminate\Support\Facades\Log;

class RentController extends Controller
{
    // Get all rents
    public function index()
    {
        $rents = Rent::all();
        return response()->json(['success' => true, 'data' => $rents]);
    }

    // Create a new rent
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'rental_date' => 'required|date',
            'return_date' => 'required|date|after:rental_date',
            'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:cars,id',
        ]);

        // Check if the car is available for the selected period
        $car_id = $request->input('car_id');
        $rental_date = $request->input('rental_date');
        $return_date = $request->input('return_date');

        $isCarAvailable = !CarAvailability::where('car_id', $car_id)
            ->where(function ($query) use ($rental_date, $return_date) {
                $query->whereBetween('start_date', [$rental_date, $return_date])
                      ->orWhereBetween('end_date', [$rental_date, $return_date])
                      ->orWhere(function ($query) use ($rental_date, $return_date) {
                          $query->where('start_date', '<=', $rental_date)
                                ->where('end_date', '>=', $return_date);
                      });
            })->exists();

        if (!$isCarAvailable) {
            return response()->json(['success' => false, 'message' => 'Car is not available for the selected period'], 400);
        }

        try {
            // Calculate the total price
            $car = Car::findOrFail($car_id);
            $days = (new \DateTime($return_date))->diff(new \DateTime($rental_date))->days;
            $total_price = $car->price * $days;

            // Create the rent
            $rent = Rent::create([
                'user_id' => $request->input('user_id'),
                'car_id' => $car_id,
                'start_date' => $rental_date,
                'end_date' => $return_date,
                'total_price' => $total_price,
            ]);

            // Update the car's availability for the selected period
            CarAvailability::create([
                'car_id' => $car_id,
                'start_date' => $rental_date,
                'end_date' => $return_date,
            ]);

            // Increment the rental count
            $car->increment('rental_count');

            // Check if the car needs maintenance
            if ($car->rental_count >= 5) {
                // Mark the car as not available
                $car->available = false;
                $car->save();

                // Create a maintenance record
                Maintenance::create([
                    'car_id' => $car_id,
                    'maintenance_date' => now(),
                    'description' => 'Automatic maintenance after 5 rentals',
                    'cost' => 0, // Set the cost as needed
                ]);
            }

            return response()->json(['success' => true, 'data' => $rent], 201);
        } catch (Exception $e) {
            Log::error('Error creating rent: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Insertion impossible', 'error' => $e->getMessage()], 500);
        }
    }

    // Get rents of a specific user
    public function getUserRents($user_id)
    {
        $user = User::with('rents.car')->find($user_id);
        $rents = $user->rents;

        return response()->json(['success' => true, 'data' => $rents]);
    }

    public function update(Request $request, $id)
    {
        $rent = Rent::findOrFail($id);

        $validatedData = $request->validate([
            'rental_date' => 'required|date',
            'return_date' => 'required|date|after:rental_date',
            'user_id' => 'required|exists:users,id',
            'car_id' => 'required|exists:cars,id',
        ]);

        // Check if the car is available for the selected period
        $car_id = $request->input('car_id');
        $rental_date = $request->input('rental_date');
        $return_date = $request->input('return_date');

        $isCarAvailable = !CarAvailability::where('car_id', $car_id)
            ->where('id', '!=', $id)
            ->where(function ($query) use ($rental_date, $return_date) {
                $query->whereBetween('start_date', [$rental_date, $return_date])
                      ->orWhereBetween('end_date', [$rental_date, $return_date])
                      ->orWhere(function ($query) use ($rental_date, $return_date) {
                          $query->where('start_date', '<=', $rental_date)
                                ->where('end_date', '>=', $return_date);
                      });
            })->exists();

        if (!$isCarAvailable) {
            return response()->json(['success' => false, 'message' => 'Car is not available for the selected period'], 400);
        }

        try {
            // Calculate the total price
            $car = Car::findOrFail($car_id);
            $days = (new \DateTime($return_date))->diff(new \DateTime($rental_date))->days;
            $total_price = $car->price * $days;

            $rent->update([
                'user_id' => $request->input('user_id'),
                'car_id' => $car_id,
                'start_date' => $rental_date,
                'end_date' => $return_date,
                'total_price' => $total_price,
            ]);

            // Update the car's availability for the selected period
            CarAvailability::create([
                'car_id' => $car_id,
                'start_date' => $rental_date,
                'end_date' => $return_date,
            ]);

            return response()->json(['success' => true, 'data' => $rent]);
        } catch (Exception $e) {
            Log::error('Error updating rent: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Mise à jour impossible', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $rent = Rent::find($id);

        if (!$rent) {
            return response()->json(['success' => false, 'message' => 'Rent not found'], 404);
        }

        try {
            $rent->delete();
            return response()->json(['success' => true, 'message' => 'Rent deleted successfully']);
        } catch (Exception $e) {
            Log::error('Error deleting rent: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Suppression impossible', 'error' => $e->getMessage()], 500);
        }
    }
}