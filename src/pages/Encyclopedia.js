import { useEffect, useState } from "react"
import brandApi from '../api/brands'
import Brand from "../components/Brand"
import SearchModal from "../components/SearchModal"
import ColorModal from "../components/ColorModal"
import { SearchIcon } from "@heroicons/react/outline"
import { ColorSwatchIcon } from '@heroicons/react/solid'

export default function Encyclopedia() {

    const [brands, setBrands] = useState([])
    const [showSearchModal, setShowSearchModal] = useState(false)
    const [showColorModal, setShowColorModal] = useState(false)

    useEffect(() => {
        brandApi.get()
            .then(res => setBrands(res.data))
    }, [])

    return (
        <div>
            {showSearchModal && <SearchModal closeModal={() => setShowSearchModal(false)}/>}
            {showColorModal && <ColorModal closeModal={() => setShowColorModal(false)} />}
            <div className="flex justify-center gap-4 pt-4">
                <div className="search-btn-flex" onClick={() => setShowSearchModal(true)}>
                    <SearchIcon className="w-5 h-5 mr-1" />
                    <span>全站搜索</span>
                </div>
                <div className="search-btn-flex" onClick={() => setShowColorModal(true)}>
                    <ColorSwatchIcon className="w-5 h-5 fill-red-500 mr-1" />
                    <span>颜色匹配</span>
                </div>
            </div>
            <div className="text-center text-indigo-100 flex flex-col sm:flex-row flex-wrap">
                {brands.map(brand => (
                    <div className="sm:w-1/2">
                        <Brand brand={brand} key={brand.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}