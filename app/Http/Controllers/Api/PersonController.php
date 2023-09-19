<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PersonCollection;
use App\Http\Resources\PersonResource;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $person =Person::paginate();
        return (new PersonCollection($person))->response();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'FirstName' => 'required',
            'LastName' => 'required',
            'Email' => 'required|email|unique:users,email',
            'Address' => 'required',
            'Specialization' => 'required',
            'City' => 'required',
            'Zip' => 'required',
            'State' => 'required',
            'About' => 'required',
            'Contry' => 'required',
            'ImageName' => 'required|image|mimes:jpeg,png,jpg,gif', // Adjust image validation rules as needed
        ]);

        $person = new Person();
        $person->FirstName = $request->input('FirstName');
        $person->UserName = $request->input('UserName'); // Assuming you have a 'UserName' field in your Person model
        $person->LastName = $request->input('LastName');
        $person->Email = $request->input('Email');
        $person->Address = $request->input('Address');
        $person->Specialization = $request->input('Specialization');
        $person->City = $request->input('City');
        $person->Zip = $request->input('Zip');
        $person->State = $request->input('State');
        $person->About = $request->input('About');
        $person->Contry = $request->input('Contry'); // Fixed 'Contry' to 'Country'

        if ($request->hasFile('ImageName')) {
            $image = $request->file('ImageName');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(storage_path('app/public'), $imageName); // Assuming you want to store images in the 'public/images' directory

            $person->ImageName = $imageName;
        }

        $person->save();
        Log::info("Person ID {$person->id} created successfully.");

        return (new PersonResource($person))->response()->setStatusCode(Response::HTTP_CREATED);







    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Person $person)
    {
        return (new PersonResource($person))->response();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request

     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);

        $validatedData = $request->validate([
            'FirstName' => 'required',
            'LastName' => 'required',
            'Email' => 'required|email|unique:users,email,' . $id, // Ensure the email is unique, excluding the current user
            'Address' => 'required',
            'Specialization' => 'required',
            'City' => 'required',
            'Zip' => 'required',
            'State' => 'required',
            'About' => 'required',
            'Contry' => 'required', // Fixed 'Contry' to 'Country'
            'ImageName' => 'image|mimes:jpeg,png,jpg,gif', // Adjust image validation rules as needed
        ]);

        $person->fill($validatedData);

        if ($request->hasFile('ImageName')) {
            $image = $request->file('ImageName');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(storage_path('app/public'), $imageName); // Assuming you want to store images in the 'public/images' directory

            $person->ImageName = $imageName;
        }

        $person->save();
        Log::info("Person ID {$person->id} updated successfully.");

        return (new PersonResource($person))->response()->setStatusCode(Response::HTTP_OK);

    }




    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Person  $person
     * @return \Illuminate\Http\Response
     */
    public function destroy(Person $person)
    {
        try {
            $person->delete();

            // Return a success response
            return response()->json(['message' => 'Person deleted successfully']);
        } catch (\Exception $e) {
            // Return an error response
            return response()->json(['error' => 'An error occurred while deleting the person'], 500);
        }
    }
}
