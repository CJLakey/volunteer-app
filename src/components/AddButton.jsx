export default function AddButton({type}){
    return (
        <button className="inline-flex justify-center gap-x-1.5 rounded-md bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 capitalize">Add {type}</button>
    )
}