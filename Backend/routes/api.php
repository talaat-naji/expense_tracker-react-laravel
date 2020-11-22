<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->get('/chartData', 'ExpenseController@chartData');

Route::middleware('auth:sanctum')->get('/book', 'BookController@index');

Route::middleware('auth:sanctum')->get('/categories', 'CategoryController@getCategories');
Route::middleware('auth:sanctum')->get('/expenses', 'ExpenseController@getExpensesByUser');

Route::middleware('auth:sanctum')->post('/addExpense', 'ExpenseController@store');
Route::middleware('auth:sanctum')->post('/updateExpense', 'ExpenseController@update');
Route::middleware('auth:sanctum')->post('/deleteExpense', 'ExpenseController@destroy');