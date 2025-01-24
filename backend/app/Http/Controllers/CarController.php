<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Maintenance;
use Exception;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $cars = Car::all();
            return response()->json($cars);
        } catch (Exception $e) {
            return response()->json("Problème de récupération de la liste des voitures");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $car = new Car([
                'photo1' => $request->input('photo1'),
                'photo2' => $request->input('photo2'),
                'brand' => $request->input('brand'),
                'model' => $request->input('model'),
                'gearbox' => $request->input('gearbox'),
                'fuel_type' => $request->input('fuel_type'),
                'price' => $request->input('price'),
                'available' => $request->input('available'),
            ]);
            $car->save();
            return response()->json($car);
        } catch (Exception $e) {
            return response()->json("Insertion impossible");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $car = Car::findOrFail($id);
            return response()->json($car);
        } catch (Exception $e) {
            return response()->json("Voiture non trouvée");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $car = Car::findOrFail($id);
            $car->update($request->all());
            return response()->json($car);
        } catch (Exception $e) {
            return response()->json("Mise à jour impossible");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $car = Car::findOrFail($id);
            $car->delete();
            return response()->json("Voiture supprimée");
        } catch (Exception $e) {
            return response()->json("Suppression impossible");
        }
    }

    /**
     * Get cars by model.
     */
    public function getByModel($model)
    {
        try {
            $cars = Car::where('model', 'LIKE', "%{$model}%")->get();
            return response()->json(['success' => true, 'data' => $cars]);
        } catch (Exception $e) {
            return response()->json("Problème de recherche des voitures par modèle");
        }
    }

    /**
     * Get cars by brand.
     */
    public function getByBrand($brand)
    {
        try {
            $cars = Car::where('brand', 'LIKE', "%{$brand}%")->get();
            return response()->json(['success' => true, 'data' => $cars]);
        } catch (Exception $e) {
            return response()->json("Problème de recherche des voitures par marque");
        }
    }
    public function carsPaginate()
{
    try {
        $perPage = request()->input('pageSize', 10);
        // Utilisation de paginate() directement sur la requête
        $articles = Car::paginate($perPage); // Pagination sur les articles (ou voitures)
        
        // Retourne le résultat en format JSON API
        return response()->json([
            'products' => $articles->items(), // Les articles paginés
            'totalPages' => $articles->lastPage(), // Le nombre total de pages
            'currentPage' => $articles->currentPage(), // Page actuelle
            'totalItems' => $articles->total(), // Total des articles
        ]);
    } catch (\Exception $e) {
        return response()->json("Selection impossible {$e->getMessage()}");
    }
}
public function setRentalCount($id, $count)
{
    try {
        $car = Car::findOrFail($id);
        $car->rental_count = $count;
        $car->save();

        // Check if the car needs maintenance
        if ($car->rental_count >= 5) {
            // Mark the car as not available
            $car->available = false;
            $car->save();

            // Create a maintenance record
            Maintenance::create([
                'car_id' => $car->id,
                'maintenance_date' => now(),
                'description' => 'Automatic maintenance after 5 rentals',
                'cost' => 0, // Set the cost as needed
            ]);
        }

        return response()->json(['success' => true, 'data' => $car]);
    } catch (Exception $e) {
        return response()->json(['success' => false, 'message' => 'Update failed', 'error' => $e->getMessage()], 500);
    }
}
}