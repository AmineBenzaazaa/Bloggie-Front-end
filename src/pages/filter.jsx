import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../components/Select";
import categories from '../helpers/categories.json';
import { filterNewsApi } from "../stores/newsApi";
import { filterNyTimes } from "../stores/nytimes";
import { filterGuardian } from "../stores/guardian";

const sources = [
  { id: 0, name: 'News Api' },
  { id: 1, name: 'The Guardian' },
  { id: 2, name: 'New York Times' }
]

const Filter = ({ isFiltiring, setIsFiltering }) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('');
  const [source, setSourceOption] = useState(sources[0]);
  const [category, setCategoryOption] = useState({});

  const queryBuilder = () => {
    try {
      if (!source) setSourceOption(sources[0]);
      if (category.id === 0) setCategoryOption({})
      if (source.id === 0) {
        dispatch(filterNewsApi({ q: search, category: category.name })).then(() => setIsFiltering(0))
      }
      if (source.id === 1) {
        dispatch(filterGuardian({ q: search, category: category.name })).then(() => setIsFiltering(1))
      }
      if (source.id === 2) {
        dispatch(filterNyTimes({ q: search, category: category.name })).then(() => setIsFiltering(2))
      }
    } catch (err) {
      return console.log(err);
    }
  }

  return (
    <div className="flex justify-center px-5 lg:px-0">
      <div className="w-full sm:max-w-5xl lg:max-w-7xl p-2 rounded-lg">
        <div className="flex items-center justify-between my-2">
          <p className="mb-4 text-4xl font-bold text-black">
            Filters
          </p>
        </div>

        <div className="relative ">
          <div className="absolute flex items-center ml-2 h-full">
            <svg className="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
            </svg>
          </div>

          <input type="text" placeholder="Search by listing, location, bedroom number..."
            className="px-8 py-3 w-full rounded-md bg-white border
           focus:ring-0 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div>
          <div className="flex flex-col md:flex-row  gap-4 mt-4">
            <Select options={sources} option={setSourceOption} />
            <Select options={categories} option={setCategoryOption} placeholder='category' />
          </div>

        </div>
        <div className="flex-none">
          <div className="relative py-8">
            <button className="text-white rounded-md py-2 px-6 bg-blue-600 absolute bottom-0 right-0 mb-4 " onClick={queryBuilder}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Filter