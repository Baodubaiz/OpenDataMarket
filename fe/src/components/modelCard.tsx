// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { AI_Model } from "@/types/index";

// interface ModelCardProps {
//     model: AI_Model;
//     onTryModel?: (model: AI_Model) => void;
//     className?: string;
// }

// export function ModelCard({ model, onTryModel, className }: ModelCardProps) {
//     // tìm ảnh chính
//     const mainImage = model.images?.find((img) => img.is_main);

//     // fallback nếu không có ảnh chính
//     const thumbnail = mainImage?.url || model.images?.[0]?.url || "/placeholder.png";

//     return (
//         <Card className={`glass rounded-2xl overflow-hidden ${className}`}>
//             <img
//                 src={thumbnail}
//                 alt={model.name}
//                 className="w-full h-48 object-cover"
//             />
//             <CardContent>
//                 <h3 className="font-bold text-lg">{model.name}</h3>
//                 <p className="text-sm text-gray-300 mb-2">{model.description}</p>
//                 <Button onClick={() => onTryModel?.(model)}>Try Demo</Button>
//             </CardContent>
//         </Card>
//     );
// }
