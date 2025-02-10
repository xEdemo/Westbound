import { updateNestedValue, getValue } from "../../../utils";

const DynamicForm = ({ config, formValues, setFormValues, onSubmit, mode }) => {
	const handleChange = (e) => {
		const { name, type, value, checked, files, min, max } = e.target;
		let newValue;
		if (type === "checkbox") {
			newValue = checked;
		} else if (type === "file") {
			newValue = files[0];
		} else if (type === "number") {
			newValue = value === "" ? "" : Number(value);

			// Enfore min if specified
			if (min !== "" && newValue !== "" && newValue < Number(min)) {
				newValue = Number(min);
			}
			// Enfore max if specified
			if (max !== "" && newValue !== "" && newValue > Number(max)) {
				newValue = Number(max);
			}
		} else {
			newValue = value;
		}

		if (name.includes(".")) {
			setFormValues((prev) => updateNestedValue(prev, name, newValue));
		} else {
			setFormValues((prev) => ({ ...prev, [name]: newValue }));
		}

		const fieldConfig = config.fields.find((f) => f.name === name);
		if (fieldConfig && fieldConfig.resetOnChange) {
			setFormValues((prev) => ({
				...prev,
				...fieldConfig.resetOnChange,
			}));
		}
	};

	const renderField = (field, parentName = "") => {
		const fullName = parentName
			? `${parentName}.${field.name}`
			: field.name;
		if (field.type === "group") {
			return (
				<fieldset key={fullName} className="form-group">
					{/* <legend>{field.label}</legend> */}
					{field.fields.map((subField) =>
						renderField(subField, fullName)
					)}
				</fieldset>
			);
		}
		if (field.type === "array") {
			const arr = getValue(fullName, formValues) || [];
			const options =
				typeof field.options === "function" && field.options();
			return (
				<div key={fullName} className="array-field">
					<div className="array-label-container">
						<label>{field.label}</label>
						<button
							type="button"
							onClick={() => {
								const newArr = [...arr, ""]; // Append an empty string
								setFormValues((prev) =>
									updateNestedValue(prev, fullName, newArr)
								);
							}}
							disabled={field.disabled}
						>
							Add {field.itemLabel || "Item"}
						</button>
					</div>
					{arr.map((itemValue, index) => (
						<div key={index} className="array-field-item">
							{field.itemType === "select" ? (
								<select
									name={`${fullName}.${index}`}
									value={itemValue}
									onChange={(e) => {
										const newItemValue = e.target.value;
										const newArr = [...arr];
										newArr[index] = newItemValue;
										setFormValues((prev) =>
											updateNestedValue(
												prev,
												fullName,
												newArr
											)
										);
									}}
								>
									<option value="">
										{field.placeholder ||
											"Choose an option"}
									</option>
									{options && options.length !== 0 ? (
										options.map((opt, i) => (
											<option key={i} value={opt.value}>
												{opt.label}
											</option>
										))
									) : (
										<option disabled>
											{field.emptyPlaceholder}
										</option>
									)}
								</select>
							) : (
								<input
									type="text"
									name={`${fullName}.${index}`}
									value={itemValue}
									onChange={(e) => {
										const newItemValue = e.target.value;
										const newArr = [...arr];
										newArr[index] = newItemValue;
										setFormValues((prev) =>
											updateNestedValue(
												prev,
												fullName,
												newArr
											)
										);
									}}
								/>
							)}
							<div>
								<button
									type="button"
									style={{
										margin: "2px 0 12px",
									}}
									onClick={() => {
										const newArr = arr.filter(
											(_, i) => i !== index
										);
										setFormValues((prev) =>
											updateNestedValue(
												prev,
												fullName,
												newArr
											)
										);
									}}
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
			);
		}
		switch (field.type) {
			case "text":
			case "number":
			case "file":
				return (
					<div key={fullName}>
						<label htmlFor={fullName}>
							{field.label}
							{field.required && (
								<span className="required-field">*</span>
							)}
							{field.unique && (
								<span className="unique-field">*</span>
							)}
						</label>
						{getValue(fullName, formValues) &&
							typeof getValue(fullName, formValues) ===
								"object" && (
								<div>
									<p style={{ fontWeight: "bold" }}>
										New Image Preview:
									</p>
									<img
										src={URL.createObjectURL(
											getValue(fullName, formValues)
										)}
										alt="Preview"
										style={{ maxWidth: "200px" }}
									/>
								</div>
							)}
						{mode === "edit" &&
							!getValue(fullName, formValues) &&
							field.initialImageUrl && (
								<div>
									<p>Current Image:</p>
									<img
										src={field.initialImageUrl}
										alt="Current"
										style={{ maxWidth: "200px" }}
									/>
								</div>
							)}
						<input
							id={fullName}
							name={fullName}
							type={field.type}
							onChange={handleChange}
							value={
								field.type !== "file"
									? getValue(fullName, formValues)
									: undefined
							}
							required={field.required}
							disabled={field.disabled}
							{...(field.type === "number"
								? { min: field.min, max: field.max }
								: {})}
						/>
					</div>
				);
			case "textarea":
				return (
					<div key={fullName}>
						<label htmlFor={fullName}>
							{field.label}
							{field.required && (
								<span className="required-field">*</span>
							)}
						</label>
						<textarea
							id={fullName}
							name={fullName}
							onChange={handleChange}
							value={getValue(fullName, formValues)}
							required={field.required}
							disabled={field.disabled}
							maxLength={field.maxLength}
						/>
					</div>
				);
			case "select":
				const options =
					typeof field.options === "function" && field.options();
				return (
					<div key={fullName} className="admin-form-field">
						<label htmlFor={fullName}>
							{field.label}
							{field.required && (
								<span className="required-field">*</span>
							)}
						</label>
						<select
							id={fullName}
							name={fullName}
							onChange={handleChange}
							value={getValue(fullName, formValues)}
							required={field.required}
							disabled={field.disabled}
						>
							<option value="">
								{field.placeholder || "Select an option"}
							</option>
							{options && options.length !== 0 ? (
								options.map((opt, i) => (
									<option key={i} value={opt.value}>
										{opt.label}
									</option>
								))
							) : (
								<option disabled>
									{field.emptyPlaceholder}
								</option>
							)}
						</select>
					</div>
				);
			case "checkbox":
				return (
					<div key={fullName} className="admin-checkbox-field">
						<label htmlFor={fullName}>{field.label}</label>
						<input
							id={fullName}
							name={fullName}
							type="checkbox"
							onChange={handleChange}
							checked={!!getValue(fullName, formValues)}
						/>
					</div>
				);
			case "h2":
				return <h2 key={`${fullName}.${field.label}`}>{field.label}</h2>;
			case "h3":
				return <h3 key={`${fullName}.${field.label}`}>{field.label}</h3>;
			case "sub h3":
				return <h3 key={`${fullName}.${field.label}`} style={{ fontStyle: "italic" }}>{field.label}</h3>;
			default:
				return null;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formValues);
	};

	return (
		<form onSubmit={handleSubmit} className="admin-form">
			{config.fields.map((field) => renderField(field))}
			<div className="form-footer">
				<button type="submit">{config.submitText}</button>
				<div>
					<p dangerouslySetInnerHTML={{ __html: config.keyText }}></p>
				</div>
			</div>
		</form>
	);
};

export default DynamicForm;
