import { useState, useEffect, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	AdminLayout,
	Loading,
	DynamicTable,
	DeleteModal,
} from "../../../../components";
import { toast } from "react-toastify";
import { fetchItems, deleteItem } from "../../../../slices/item/itemSlice.js";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

const Item = () => {
	const [deleteModalItem, setDeleteModalItem] = useState(null);

	const { items, loading, error } = useSelector((state) => state.item);

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const fetch = async () => {
		try {
			const res = await dispatch(fetchItems()).unwrap();
			//console.log(res);
		} catch (err) {
			toast.error(err);
		}
	};

	useEffect(() => {
		fetch();
	}, [location.pathname]);

	const columns = useMemo(
		() => [
			{
				label: "ID",
				accessor: "_id",
				sortable: true,
			},
			{
				label: "Name",
				accessor: "name",
				sortable: true,
			},
			{
				label: "Category",
				accessor: "category",
				sortable: true,
			},
			{
				label: "Created By",
				accessor: "createdBy",
				sortable: false,
				Cell: (row) =>
					String(row?.createdBy?.user?.username)
						.charAt(0)
						.toUpperCase() +
					String(row?.createdBy?.user?.username).slice(1),
			},
			{
				label: "PUT",
				accessor: "edit",
				sortable: false,
				Cell: (row) => (
					<FaPencilAlt
						style={{ cursor: "pointer" }}
						onClick={(e) => {
							e.stopPropagation();
							navigate(`/admin/item/${row._id}`);
						}}
					/>
				),
			},
			{
				label: "DELETE",
				accessor: "delete",
				sortable: false,
				Cell: (row) => (
					<FaRegTrashAlt
						style={{ cursor: "pointer" }}
						onClick={(e) => {
							e.stopPropagation();
							setDeleteModalItem(row);
						}}
					/>
				),
			},
		],
		[navigate]
	);

	const confirmDelete = async () => {
		try {
			await dispatch(deleteItem(deleteModalItem._id)).unwrap();
			toast.success(`${deleteModalItem.name} was successfully deleted.`);
			setDeleteModalItem(null);
		} catch (err) {
			toast.error(err);
		}
	};

	const cancelDelete = () => {
		setDeleteModalItem(null);
	};

	return (
		<AdminLayout>
			{location.pathname === "/admin/item" && (
				<>
					<div className="admin-controller-container">
						<div className="admin-title-container">
							<h1>Item Controller</h1>
							<button
								type="button"
								onClick={() => navigate("/admin/item/create")}
							>
								Create a new item
							</button>
						</div>
						<div>
							{loading || !items ? (
								<Loading />
							) : (
								<DynamicTable columns={columns} data={items} />
							)}
						</div>
					</div>
					{deleteModalItem && (
						<DeleteModal
							obj={deleteModalItem}
							onConfirm={confirmDelete}
							onCancel={cancelDelete}
						/>
					)}
				</>
			)}
			<Outlet />
		</AdminLayout>
	);
};

export default Item;
