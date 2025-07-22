
import ImgEmpty from '../../assets/no-item.webp'

const Empty = ({ keyword }: { keyword?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center text-[--gray-v5]">
            <img
                src={ImgEmpty}
                alt="No Result"
                className="w-60 h-w-60 object-contain mb-4 opacity-60"
            />
            {keyword && (
                <>
                    <p className="text-sm">Tidak ditemukan hasil untuk:</p>
                    <p className="text-gray-500 font-semibold text-sm">"{keyword}"</p> 
                </>
            )}

        </div>
    );
};

export default Empty;
