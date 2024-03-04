'use server'
import { FileMetadata } from "./_components/file-grid";
import getDummyFileMetadata from "@/service/filemetadata/dev/dummy-filemetadata";
import MainContent from "./_components/file-main-content";



export default async function Page({ params } : {params: any}) {
    // const session = await getServerSession();
    // const data: FileMetadata[] = getDummyFileMetadata(20);
    // const [setSelectedItems, selectedItems] = useState<number[]>([]);
    let path: string[] = []
    if (params.slug !== undefined) {
        path = params.slug;
    }

    return (
        <MainContent path={path}></MainContent>
    )
}
