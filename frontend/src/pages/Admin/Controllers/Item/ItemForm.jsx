import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createItem, updateItem } from "../../../../slices/item/itemSlice.js";
import { timeUnits } from "../../../../utils";
import { DynamicForm } from "../../../../components";
import { toast } from "react-toastify";

const ItemForm = ({ mode }) => {
	const { itemId } = useParams(); // only available in edit mode

	const initialValues = {
		name: "",
		description: "",
		image: null,
		venderBuy: 10,
		venderSell: 8,
		slot: "", // dropdown
		isConsumable: false,
		isStackable: true,
		isTradeable: true,
		isQuestItem: false,
		isEquippable: false,
		category: "", // dropdown
		effect: {
			type: "",
			applyChance: "",
			description: "",
			amount: "",
			duration: {
				value: "",
				unit: "", // dropdown
			},
			cooldown: {
				value: "",
				unit: "", // dropdown
			},
		},
		armour: {
			rating: "",
		},
		weapon: {
			type: "", // dropdown
			accuracy: "",
			damage: {
				type: "",
				amount: "",
			},
			ammunition: {
				type: [],
				expenditure: {
					high: "",
					low: "",
				},
			},
		},
		comments: "",
	};

	const [formValues, setFormValues] = useState(initialValues);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const item = useSelector((state) =>
		state.item.items ? state.item.items.find((i) => i._id === itemId) : null
	);
	const { items } = useSelector((state) => state.item);

	const { enums } = useSelector((state) => state.enum);

	useEffect(() => {
		if (mode === "edit" && itemId && item) {
			setFormValues({
				name: item.name,
				description: item.description,
				image: null,
				venderBuy: item.value.vender.venderBuy,
				venderSell: item.value.vender.venderSell,
				slot: item.slot,
				isConsumable: item.isConsumable,
				isStackable: item.isStackable,
				isTradeable: item.isTradeable,
				isQuestItem: item.isQuestItem,
				isEquippable: item.isEquippable,
				category: item.category,
				effect: {
					type: item?.effect?.type || "",
					applyChance: item?.effect?.applyChance || "",
					description: item?.effect?.description || "",
					amount: item?.effect?.amount || "",
					duration: {
						value: item?.effect?.duration?.value || "",
						unit: item?.effect?.duration?.unit || "",
					},
					cooldown: {
						value: item?.effect?.cooldown?.value || "",
						unit: item?.effect?.cooldown?.unit || "",
					},
				},
				armour: {
					rating: item?.armour?.rating || "",
				},
				weapon: {
					type: item?.weapon?.type || "",
					accuracy: item?.weapon?.accuracy || "",
					damage: {
						type: item?.weapon?.damage?.type || "",
						amount: item?.weapon?.damage?.amount || "",
					},
					ammunition: {
						type: item?.weapon?.ammunition?.type || [],
						expenditure: {
							high: item?.weapon?.ammunition?.expenditure?.high || "",
							low: item?.weapon?.ammunition?.expenditure?.low || "",
						},
					},
				},
			});
		}
	}, [mode, itemId, item]);

	const handleSubmit = async (values) => {
		try {
			const dataToSend = new FormData();
			dataToSend.append("name", values.name);
			dataToSend.append("description", values.description);
			dataToSend.append("image", values.image);
			dataToSend.append("venderBuy", values.venderBuy);
			dataToSend.append("venderSell", values.venderSell);
			dataToSend.append("slot", values.slot);
			dataToSend.append("isConsumable", values.isConsumable);
			dataToSend.append("isStackable", values.isStackable);
			dataToSend.append("isTradeable", values.isTradeable);
			dataToSend.append("isQuestItem", values.isQuestItem);
			dataToSend.append("isEquippable", values.isEquippable);
			dataToSend.append("category", values.category);
			dataToSend.append("effect", JSON.stringify(values.effect));
			dataToSend.append("armour", JSON.stringify(values.armour));
			dataToSend.append("weapon", JSON.stringify(values.weapon));
			dataToSend.append("comments", values.comments);

			if (mode === "create") {
				await dispatch(createItem(dataToSend)).unwrap();
				toast.success("Item created successfully.");
			} else if (mode === "edit") {
				await dispatch(
					updateItem({ itemId, data: dataToSend })
				).unwrap();
				toast.success("Item updated successfully.");
			}
			navigate("/admin/item");
		} catch (err) {
			toast.error(err);
		}
	};

	const itemFormConfig = {
		fields: [
			{
				type: "h2",
				label: "General",
			},
			{
				name: "name",
				label: "Name",
				type: "text",
				required: true,
				unique: true,
				uniqueValues: () => {
					let itemNameArray = [];
					items &&
						items.map((n) =>
							itemNameArray.push(n.name.toLowerCase())
						);
					if (mode === "edit") {
						itemNameArray =
							item &&
							itemNameArray.filter(
								(i) => i !== item.name.toLowerCase()
							);
					}
					return itemNameArray;
				},
			},
			{
				name: "description",
				label: "Description",
				type: "textarea",
				required: true,
				maxLength: 10000,
			},
			{
				name: "image",
				label: "Image",
				type: "file",
				required: mode === "create" ? true : false,
				initialImageUrl:
					mode === "edit" ? item && item.image.url : null,
			},
			{
				name: "category",
				label: "Category",
				type: "select",
				required: true,
				placeholder: "Select a category",
				options: () => {
					const enumObj = enums.find(
						(e) => e.category === "itemCategory"
					);
					return enumObj && enumObj.names
						? enumObj.names.map((n) => ({
								value: n.name,
								label: n.name,
						  }))
						: [];
				},
				resetOnChange: {
					effect: initialValues.effect,
					weapon: initialValues.weapon,
					armour: initialValues.armour,
				},
			},
			{
				name: "isConsumable",
				label: "Is the item consumable?",
				type: "checkbox",
			},
			{
				name: "isStackable",
				label: "Is the item stackable?",
				type: "checkbox",
			},
			{
				name: "isTradeable",
				label: "Is the item tradeable?",
				type: "checkbox",
			},
			{
				name: "isQuestItem",
				label: "Is the item a quest item?",
				type: "checkbox",
			},
			{
				name: "isEquippable",
				label: "Is the item equippable?",
				type: "checkbox",
				resetOnChange: {
					slot: initialValues.slot,
				},
			},
			{
				name: "slot",
				label: "Slot",
				type: "select",
				disabled: !formValues.isEquippable,
				placeholder: "Select a slot",
				options: () => {
					const enumObj =
						enums && enums.find((e) => e.category === "itemSlot");
					return enumObj && enumObj.names
						? enumObj.names.map((n) => ({
								value: n.name,
								label: n.name,
						  }))
						: [];
				},
			},
			{
				type: "h2",
				label: "Economics",
			},
			{
				name: "venderBuy",
				label: "Vender Buy",
				type: "number",
				min: 1,
			},
			{
				name: "venderSell",
				label: "Vender Sell",
				type: "number",
				min: 1,
			},
			{
				type: "h2",
				label: "Effect",
			},
			{
				type: "group",
				name: "effect",
				fields: [
					{
						name: "type",
						label: "Effect Type",
						type: "select",
						placeholder: "Select an effect type",
						options: () => {
							const enumObj =
								enums &&
								enums.find(
									(e) => e.category === "itemEffectType"
								);
							return enumObj && enumObj.names
								? enumObj.names.map((n) => ({
										value: n.name,
										label: n.name,
								  }))
								: [];
						},
						disabled:
							!formValues.category.includes("Weapon") &&
							formValues.category !== "intoxicants" &&
							formValues.category !== "medical" &&
							formValues.category !== "ammunition",
					},
					{
						name: "description",
						label: "Description",
						type: "textarea",
						maxLength: 10000,
						disabled:
							!formValues.category.includes("Weapon") &&
							formValues.category !== "intoxicants" &&
							formValues.category !== "medical" &&
							formValues.category !== "ammunition",
					},
					{
						name: "applyChance",
						label: "Apply Chance",
						type: "number",
						min: 1,
						max: 100,
						disabled:
							!formValues.category.includes("Weapon") &&
							formValues.category !== "intoxicants" &&
							formValues.category !== "medical" &&
							formValues.category !== "ammunition",
					},
					{
						name: "amount",
						label: "Total Damage/Heal Amount",
						type: "number",
						min: 1,
						disabled:
							!formValues.category.includes("Weapon") &&
							formValues.category !== "intoxicants" &&
							formValues.category !== "medical" &&
							formValues.category !== "ammunition",
					},
					{
						label: "Duration",
						type: "h3",
					},
					{
						type: "group",
						name: "duration",
						fields: [
							{
								name: "value",
								label: "Value",
								type: "number",
								disabled:
									!formValues.category.includes("Weapon") &&
									formValues.category !== "intoxicants" &&
									formValues.category !== "medical" &&
									formValues.category !== "ammunition",
							},
							{
								name: "unit",
								label: "Units",
								type: "select",
								options: () => {
									return timeUnits.map((n) => ({
										value: n,
										label: n,
									}));
								},
								placeholder: "Select a unit",
								required:
									formValues.effect.duration.value !== ""
										? true
										: false,
								disabled:
									!formValues.category.includes("Weapon") &&
									formValues.category !== "intoxicants" &&
									formValues.category !== "medical" &&
									formValues.category !== "ammunition",
							},
						],
					},
					{
						label: "Cooldown",
						type: "h3",
					},
					{
						type: "group",
						name: "cooldown",
						fields: [
							{
								name: "value",
								label: "Value",
								type: "number",
								disabled:
									!formValues.category.includes("Weapon") &&
									formValues.category !== "intoxicants" &&
									formValues.category !== "medical" &&
									formValues.category !== "ammunition",
							},
							{
								name: "unit",
								label: "Units",
								type: "select",
								placeholder: "Select a unit",
								options: () => {
									return timeUnits.map((n) => ({
										value: n,
										label: n,
									}));
								},
								required:
									formValues.effect.cooldown.value !== ""
										? true
										: false,
								disabled:
									!formValues.category.includes("Weapon") &&
									formValues.category !== "intoxicants" &&
									formValues.category !== "medical" &&
									formValues.category !== "ammunition",
							},
						],
					},
				],
			},
			{
				label: "Armour",
				type: "h2",
			},
			{
				type: "group",
				name: "armour",
				fields: [
					{
						type: "number",
						label: "Rating",
						name: "rating",
						required: formValues.category === "armour",
						disabled: !formValues.category.includes("armour"),
						min: 1,
					},
				],
			},
			{
				label: "Weapon",
				type: "h2",
			},
			{
				type: "group",
				name: "weapon",
				fields: [
					{
						name: "type",
						label: "Weapon Type",
						type: "select",
						placeholder: "Select a weapon type",
						emptyPlaceholder: `No weapon types have been found for the ${formValues.category} category.`,
						options: () => {
							const enumObj =
								enums &&
								enums.find(
									(e) => e.category === "itemWeaponType"
								);
							if (!enumObj) {
								return [];
							}
							const categoryEnum = enumObj.names.filter(
								(e) => e.parent === formValues.category
							);

							return categoryEnum.length !== 0
								? categoryEnum.map((n) => ({
										value: n.name,
										label: n.name,
								  }))
								: [];
						},
						disabled: !formValues.category.includes("Weapon"),
						required: formValues.category.includes("Weapon"),
					},
					{
						name: "accuracy",
						label: "Accuracy",
						type: "number",
						min: 1,
						disabled: !formValues.category.includes("Weapon"),
						required: formValues.category.includes("Weapon"),
					},
					{
						type: "h3",
						label: "Damage",
					},
					{
						type: "group",
						name: "damage",
						fields: [
							{
								name: "type",
								label: "Damage Type",
								type: "select",
								placeholder: "Select a damage type",
								emptyPlaceholder: "No damage types found.",
								options: () => {
									const enumObj =
										enums &&
										enums.find(
											(e) =>
												e.category ===
												"itemWeaponDamageType"
										);
									return enumObj && enumObj.names
										? enumObj.names.map((n) => ({
												label: n.name,
												value: n.name,
										  }))
										: [];
								},
								disabled:
									!formValues.category.includes("Weapon"),
								required:
									formValues.category.includes("Weapon"),
							},
							{
								name: "amount",
								label: "Damage Amount",
								type: "number",
								min: 1,
								disabled:
									!formValues.category.includes("Weapon"),
								required:
									formValues.category.includes("Weapon"),
							},
						],
					},
					{
						type: "h3",
						label: "Ammunition",
					},
					{
						type: "group",
						name: "ammunition",
						fields: [
							{
								type: "array",
								name: "type",
								label: "Ammunition to be Compatible",
								itemType: "select",
								placeholder:
									"Choose an ammunition that is compatible",
								emptyPlaceholder: "No ammunition was found.",
								options: () => {
									const ammo =
										items &&
										items.filter(
											(i) => i.category === "ammunition"
										);
									return ammo
										? ammo.map((i) => ({
												value: i._id,
												label: i.name,
										  }))
										: [];
								},
								disabled:
									!formValues.category.includes("Weapon"),
								required:
									formValues.category.includes("Weapon"),
							},
							{
								type: "sub h3",
								label: "Ammunition Expenditure/Rate of Fire",
							},
							{
								type: "group",
								name: "expenditure",
								fields: [
									{
										name: "low",
										label: "Lower Bound",
										type: "number",
										min: 1,
										disabled:
											!formValues.category.includes(
												"Weapon"
											),
										required:
											formValues.category.includes(
												"Weapon"
											),
									},
									{
										name: "high",
										label: "Upper Bound",
										type: "number",
										min: 1,
										disabled:
											!formValues.category.includes(
												"Weapon"
											),
										required:
											formValues.category.includes(
												"Weapon"
											),
									},
								],
							},
						],
					},
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
				<h1>{mode === "create" ? "Create Item" : "Edit Item"}</h1>
				<button type="button" onClick={() => navigate("/admin/item")}>
					Return to controller
				</button>
			</div>
			<DynamicForm
				config={itemFormConfig}
				formValues={formValues}
				setFormValues={setFormValues}
				onSubmit={handleSubmit}
				mode={mode}
			/>
		</div>
	);
};

export default ItemForm;
