import React from "react";
import { useNavigate } from "react-router-dom";
import { TD } from "../../../ui/Table/Table";

const ExpenseData = ({ expenses }) => {
	const navi = useNavigate();
	return expenses.map((expense, i) => (
		<tr key={expense._id} onClick={() => navi(expense._id)}>
			<TD>{expense.sNo}</TD>
			<TD>{expense.source}</TD>
			<TD>{expense.category}</TD>
			<TD>{new Date(expense.date).toLocaleDateString()}</TD>
			<TD>{expense.amount}</TD>
		</tr>
	));
};

export default React.memo(ExpenseData);
