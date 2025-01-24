<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use App\Models\Car;
use Exception;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    public function index()
    {
        $maintenances = Maintenance::all();
        return response()->json(['success' => true, 'data' => $maintenances]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'maintenance_date' => 'required|date',
            'description' => 'required|string',
            'cost' => 'required|numeric',
        ]);

        $maintenance = Maintenance::create($validatedData);

        // Mark the car as available after maintenance
        $car = Car::findOrFail($request->input('car_id'));
        $car->available = true;
        $car->rental_count = 0; // Reset the rental count
        $car->save();

        return response()->json(['success' => true, 'data' => $maintenance], 201);
    }

    public function show($id)
    {
        $maintenance = Maintenance::findOrFail($id);
        return response()->json(['success' => true, 'data' => $maintenance]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'maintenance_date' => 'required|date',
            'description' => 'required|string',
            'cost' => 'required|numeric',
        ]);

        $maintenance = Maintenance::findOrFail($id);
        $maintenance->update($validatedData);

        return response()->json(['success' => true, 'data' => $maintenance]);
    }

    public function destroy($id)
    {
        $maintenance = Maintenance::findOrFail($id);
        $maintenance->delete();
        return response()->json(['success' => true, 'message' => 'Maintenance deleted successfully']);
    }
    public function completeMaintenance($id)
    {
        try {
            $car = Car::findOrFail($id);
            $car->rental_count = 0;
            $car->available = true;
            $car->save();

            // Delete the maintenance record
            Maintenance::where('car_id', $car->id)->delete();

            return response()->json(['success' => true, 'message' => 'Maintenance completed and car updated successfully']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Operation failed', 'error' => $e->getMessage()], 500);
        }
    }
}