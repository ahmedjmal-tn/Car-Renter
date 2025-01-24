<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CarAvailability;
use App\Models\Car;
use Exception;

class CarAvailabilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $availabilities = CarAvailability::all();
            return response()->json(['success' => true, 'data' => $availabilities]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Problème de récupération des disponibilités']);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        try {
            $availability = CarAvailability::create($validatedData);
            return response()->json(['success' => true, 'data' => $availability], 201);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Insertion impossible']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $availability = CarAvailability::findOrFail($id);
            return response()->json(['success' => true, 'data' => $availability]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Disponibilité non trouvée']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        try {
            $availability = CarAvailability::findOrFail($id);
            $availability->update($validatedData);
            return response()->json(['success' => true, 'data' => $availability]);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Mise à jour impossible']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $availability = CarAvailability::findOrFail($id);
            $availability->delete();
            return response()->json(['success' => true, 'message' => 'Disponibilité supprimée']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Suppression impossible']);
        }
    }
}