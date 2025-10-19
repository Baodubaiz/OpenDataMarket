import Image from "next/image";
import Background from "@/components/background";
import Footer from "@/components/footer";
import DatasetDetailInfo from "@/features/buyer/detail/datasetInfor";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-x-hidden">
            <div className="relative z-0">
                <Background />

                <div className="container mx-auto py-10 px-6 space-y-8">
                    <DatasetDetailInfo />
                </div>

                <Footer />
            </div>
        </div>
    );
}

