import { useState, useEffect, useCallback } from 'react'
import { getAssets, addAsset, removeAsset, renameAsset, Asset } from '@/utils/assetManager'

export default function useAssets() {
    const [assets, setAssets] = useState<Asset[]>([])

    useEffect(() => {
        setAssets(getAssets())
    }, [])

    const create = useCallback((asset: Asset) => {
        setAssets(addAsset(asset))
    }, [])

    const remove = useCallback((id: string) => {
        setAssets(removeAsset(id))
    }, [])

    const rename = useCallback((id: string, name: string) => {
        setAssets(renameAsset(id, name))
    }, [])

    return { assets, create, remove, rename }
}
