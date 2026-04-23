import React, { useEffect ,useState } from 'react';
import { fetchProduct } from '../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { LuPackage } from "react-icons/lu";
import { useForm } from 'react-hook-form';
import { createProduct } from '../../redux/productSlice';
function Product() {
  const { handleSubmit, register } = useForm();
  const [isEdit , setIsEdit] = useState(false) ;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
  
    boxShadow: 24,
    p: 4,
  };

  const { product } = useSelector((state) => state.product);

  const handleEdit = () => {
    setIsEdit(true)
    handleOpen()
  }
  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <div>
          <img
            className="object-contain w-14"
            src={`${import.meta.env.VITE_API_URL}/${params.value}`}
          />
        </div>
      ),
    },
    { field: 'name', headerName: 'Name', width: 100 },
    {
      field: 'price',
      headerName: 'Price(Rs.)',
      width: 150,
    },
    {
      field: 'category',
      headerName: 'Category',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
    },
    {
      field: 'discountPrice',
      headerName: 'Discount Price(Rs.)',
    },
    {
      field: 'stock',
      headerName: 'Stock Avail.',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <div className="flex m-2 gap-2 cursor-pointer">
          <FiEdit2 size={26} onClick={handleEdit} className="text-blue-500" />

          <MdDeleteOutline size={26} className="text-red-500" />
        </div>
      ),
    },
  ];

  const onSubmit = async (data) => {
    console.log(data.discountPercentage);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('image', data.image[0]);
    formData.append('category', data.category);
    formData.append('stock', data.stock);
    formData.append('description', data.description);
    formData.append('discountPercentage', data.discountPercentage);
    console.log('formdata', formData);
    await dispatch(createProduct(formData));
    dispatch(fetchProduct());
    handleClose();
  };
  
  const handleButtonClick = () => {
    setIsEdit(false);
    handleOpen()
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Inventory Fleet</h1>
          <p className="text-gray-500 font-light text-sm">Manage and monitor your premium collection stock.</p>
        </div>
        <button
          onClick={handleButtonClick}
          className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-xl active:scale-95 flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add New Product
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <Box sx={{ height: 600, width: '100%', '& .MuiDataGrid-root': { border: 'none' } }}>
          <DataGrid
            rows={product}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 20]}
            disableRowSelectionOnClick
            className="text-sm"
          />
        </Box>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-[2.5rem] border-none shadow-2xl overflow-hidden p-0">
          <div className="bg-black p-8 text-white">
             <h2 className="text-2xl font-black uppercase tracking-tighter">{isEdit ? "Update Vessel" : "Commission Product"}</h2>
             <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Product Specifications</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Title</label>
                <input
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm"
                  type="text"
                  {...register('name')}
                  placeholder="e.g. Classic Trench"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Price (INR)</label>
                <input
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm"
                  type="number"
                  {...register('price')}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Product Narrative</label>
              <textarea
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm h-24 resize-none"
                {...register('description')}
                placeholder="Describe the craftsmanship..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                <select 
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm appearance-none"
                  {...register('category')}
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Inventory Count</label>
                <input
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm"
                  type="number"
                  {...register('stock')}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Discount %</label>
              <input
                type="number"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm"
                {...register('discountPercentage')}
                placeholder="0"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Visual Asset</label>
              <div className="relative group">
                <input
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl file:hidden cursor-pointer hover:bg-gray-100 transition-all text-gray-400 text-xs"
                  type="file"
                  {...register('image')}
                />
                <div className="absolute right-4 top-3 pointer-events-none text-gray-400">
                   <LuPackage size={18} />
                </div>
              </div>
            </div>

            <button
              className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-[0.98] transition-all hover:bg-gray-800"
              type="submit"
            >
              {isEdit ? "Deploy Updates" : "Add to Collection"}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Product;
