<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Expense;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class ExpenseController extends Controller
{
    public function getExpensesByUser()
    {
        $user = Auth::id();
        $expenses = Expense::where('user_id', $user)->with('category')->latest()->simplePaginate(1000);
        return $expenses;
    }
    public function store(Request $request)
    {
        $expense = new Expense();
        $expense->user_id = Auth::id();
        $expense->category_id = $request->get('category_id');
        $expense->amount = $request->get('amount');
        $expense->date = $request->get('date');
        $expense->save();
        // $data=['user_id' => Auth::id(),
        // 'amount' => $request->get('amount'),
        // 'date' => $request->get('date'),
        // 'category_id' => $request->get('category_id')];
        // Expense::create($data);
        //return response()->json(Expense::with('category')->find($expense->id));
    }
    public function update(Request $request)
    {
        // $expense = Expense::find(1);
        // $expense->user_id = Auth::id();
        // $expense->id=$request->get('id');
        // $expense->category_id = $request->get('category_id');
        // $expense->amount = $request->get('amount');
        // $expense->date = $request->get('date');
        // $expense->save();
        Expense::where('id', $request->get('id'))
        ->where('user_id', Auth::id())
        ->update(['category_id' => $request->get('category_id'),'amount'=>$request->get('amount'),'date'=>$request->get('date')]);
    }
    public function destroy(Request $request)
    {
        $expense = Expense::findOrFail($request->id);
        if (auth()->user()->id != $expense->user_id)
            return response("", 401);
        $expense->delete();
    }
    public function chartData()
    {
        $data = Expense::select(DB::raw('sum(expenses.amount) as total, c.name as category'))
                    ->where('user_id',auth()->user()->id)
                    ->join('categories as c', 'c.id', 'expenses.category_id')
                    ->groupBy('c.id')
                    ->get();
        return response()->json($data);
    }
}