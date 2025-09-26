import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 Lấy tất cả dataset-tags
export const getAll = async () => {
  return await prisma.datasetTag.findMany({
    include: {
      dataset: true,
      tag: true,
    },
  });
};

// 📌 Thêm tag cho dataset
export const addTagToDataset = async (dataset_id: string, tag_id: string) => {
  return await prisma.datasetTag.create({
    data: {
      dataset_id,
      tag_id,
    },
  });
};

// 📌 Xóa tag khỏi dataset
export const removeTagFromDataset = async (dataset_id: string, tag_id: string) => {
  return await prisma.datasetTag.delete({
    where: {
      dataset_id_tag_id: {
        dataset_id,
        tag_id,
      },
    },
  });
};

// 📌 Update tag cho dataset (xóa tag cũ, gán tag mới)
export const updateDatasetTag = async (
  dataset_id: string,
  old_tag_id: string,
  new_tag_id: string
) => {
  // Kiểm tra dataset-tag cũ có tồn tại không
  const existing = await prisma.datasetTag.findUnique({
    where: {
      dataset_id_tag_id: {
        dataset_id,
        tag_id: old_tag_id,
      },
    },
  });

  if (!existing) {
    throw new Error("❌ DatasetTag cũ không tồn tại");
  }

  // Xóa dataset-tag cũ
  await prisma.datasetTag.delete({
    where: {
      dataset_id_tag_id: {
        dataset_id,
        tag_id: old_tag_id,
      },
    },
  });

  // Tạo dataset-tag mới
  return await prisma.datasetTag.create({
    data: {
      dataset_id,
      tag_id: new_tag_id,
    },
  });
};
