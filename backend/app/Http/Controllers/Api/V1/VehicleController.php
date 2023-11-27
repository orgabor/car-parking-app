<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\VehicleResource;
use App\Http\Requests\StoreVehicleRequest;
use Illuminate\Http\Response;

/**
 * @group Vehicles
 */

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return VehicleResource::collection(Vehicle::all());

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {
        //
        $vehicle = Vehicle::create($request->validated());

        return VehicleResource::make($vehicle);

    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        //
        return VehicleResource::make($vehicle);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreVehicleRequest $request, Vehicle $vehicle)
    {
        //
        $vehicle->update($request->validated());
        return response()->json(VehicleResource::make($vehicle), Response::HTTP_ACCEPTED);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        //
        if ($vehicle->parkings()->count() > 0) {
            return response()->json([
    'errors' => ['general' => ['Can\'t delete vechicle ' . $vehicle->plate_number . ' as it has parking history. Please delete parking history first.']],
                ], Response::HTTP_UNPROCESSABLE_ENTITY);

        }
        $vehicle->delete();

        return response()->noContent();
    }
}
