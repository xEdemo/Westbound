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
import { fetchEnums, deleteEnum } from "../../../../slices/enum/enumSlice.js";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

const Enum = () => {
	const [deleteModalEnum, setDeleteModalEnum] = useState(null);

	const { enums, loading, error } = useSelector((state) => state.enum);

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const fetch = async () => {
		try {
			const res = await dispatch(fetchEnums()).unwrap();
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
						className="admin-hover-icon-put"
						onClick={(e) => {
							e.stopPropagation();
							navigate(`/admin/enum/${row._id}`);
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
						className="admin-hover-icon-delete"
						onClick={(e) => {
							e.stopPropagation();
							setDeleteModalEnum(row);
						}}
					/>
				),
			},
		],
		[navigate]
	);

	const confirmDelete = async () => {
		try {
			await dispatch(deleteEnum(deleteModalEnum._id)).unwrap();
			toast.success(`${deleteModalEnum.category} was successfully deleted.`);
			setDeleteModalEnum(null);
		} catch (err) {
			toast.error(err);
		}
	};

	const cancelDelete = () => {
		setDeleteModalEnum(null);
	};

	return (
		<AdminLayout>
			{location.pathname === "/admin/enum" && (
				<>
					<div className="admin-controller-container">
						<div className="admin-title-container">
							<h1>Enum Controller</h1>
							<button
								type="button"
								onClick={() => navigate("/admin/enum/create")}
							>
								Create a new enum
							</button>
						</div>
						<div>
							{loading || !enums ? (
								<Loading />
							) : (
								<DynamicTable columns={columns} data={enums} />
							)}
						</div>
					</div>
					{deleteModalEnum && (
						<DeleteModal
							obj={deleteModalEnum}
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

export default Enum;
