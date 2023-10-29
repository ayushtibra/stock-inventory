import { useDeferredValue } from "react"

export default function Search({ searchItem, handleChange }) {
    return (
        <div className="w-1/3 mx-auto">
            <div className="relative pt-6 flex items-center">
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchItem}
                    onChange={handleChange}
                    placeholder="Quick Search"
                    className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    )
}