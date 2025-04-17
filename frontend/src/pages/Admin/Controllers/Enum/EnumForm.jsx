import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createEnum, updateEnum } from "../../../../slices/enum/enumSlice.js";
import { DynamicForm } from "../../../../components";
import { toast } from "react-toastify";

const EnumForm = ({ mode }) => {
	const { enumId } = useParams(); // only available in edit mode

	const initialValues = {
		category: "",
		names: [],
	};

	const [formValues, setFormValues] = useState(initialValues);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const enumerator = useSelector((state) =>
		state.enum.enums ? state.enum.enums.find((e) => e._id === enumId) : null
	);
	const { enums } = useSelector((state) => state.enum);

	useEffect(() => {
		if (mode === "edit" && enumId && enums) {
			const namesArray = Array.isArray(enumerator.names)
				? enumerator.names
				: [];
			setFormValues({
				category: enumerator.category,
				names: namesArray,
			});
		}
	}, [mode, enumId, enumerator]);

	const handleSubmit = async (values) => {
		try {
			const data = {
				category: values.category,
				names: values.names,
				comments: values.comments,
			};
			if (mode === "create") {
				await dispatch(createEnum(data)).unwrap();
				toast.success("Enum created successfully.");
			} else if (mode === "edit") {
				await dispatch(updateEnum({ enumId, data })).unwrap();
				toast.success("Enum updated successfully.");
			}
			navigate("/admin/enum");
		} catch (err) {
			toast.error(err);
		}
	};

	const enumFormConfig = {
		fields: [
			{
				type: "h2",
				label: "General",
			},
			{
				name: "category",
				label: "Category",
				type: "text",
				required: mode === "create" ? true : false,
				unique: true,
				uniqueValues: () => {
					let enumCategoryArray = [];
					enums &&
						enums.map((n) =>
							enumCategoryArray.push(n.category?.toLowerCase())
						);
					if (mode === "edit") {
						enumCategoryArray =
							enumerator &&
							enumCategoryArray.filter(
								(e) => e !== enumerator.category?.toLowerCase()
							);
					}
					return enumCategoryArray;
				},
			},
			{
				name: "names",
				label: "Names",
				type: "array",
				itemType: "object",
				fields: [
					{
						name: "name",
						label: "Name",
						type: "text",
						required: true,
					},
					{ name: "parent", label: "Parent", type: "text" },
				],
			},
			{
				label: "Comments",
				type: "h2",
			},
			{
				type: "textarea",
				name: "comments",
				label: "Comments",
				required: true,
			},
		],
	};

	return (
		<div className="admin-controller-container">
			<div className="admin-title-container">
				<h1>{mode === "create" ? "Create Enum" : "Edit Enum"}</h1>
				<button type="button" onClick={() => navigate("/admin/enum")}>
					Return to controller
				</button>
			</div>
			<DynamicForm
				config={enumFormConfig}
				formValues={formValues}
				setFormValues={setFormValues}
				onSubmit={handleSubmit}
				mode={mode}
			/>
		</div>
	);
};

export default EnumForm;
