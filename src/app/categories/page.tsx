// "use client";
// import { useAppDispatch, useAppSelector } from "@hooks";
// import { RootState } from "@store";
// import { GET, convertCategoriesToOptions } from "@utils";
// import {
//   Button,
//   Col,
//   Form,
//   FormInstance,
//   Row,
//   Select,
//   SelectProps,
// } from "antd";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useQuery } from "react-query";
// import { getMainCategories } from "src/store/slices/categories/categoriesSlice";

// interface CategorySelectProps extends SelectProps {
//   label: string;
//   value: any;
//   slug?: string;
//   id?: string;
//   rules?: any;
//   options: any;
//   onChange?: (value: any, option: any) => void;
//   name?: string;
// }

// interface BaseSelectProps {
//   label: string;
//   slug: string;
//   id?: string;
// }

// // options: [
// //   { label: "Cars", value: 1 },
// //   { label: "test", value: 2 },
// //   { label: "lorem", value: 3 },
// // ],
// const baseSelectProps = ({ label, slug, id }: BaseSelectProps) => ({
//   ...(id && { id: id }), // if id exist, then add it to the object
//   slug: slug || label.toLowerCase(),
//   label: label.charAt(0).toUpperCase() + label.slice(1),
//   // fieldNames: { label: "name", value: "id" },
//   options: [],
//   value: null,
//   placeholder: `Select a ${label.toLowerCase()}`,
// });

// const Categories = () => {
//   const { data, error, isLoading } = useQuery("categories", async () =>
//     GET({ endpoint: "get_all_cats" })
//   );
//   const [id, setId] = useState<number | null>(null);
//   const {
//     data: data2,
//     error: error2,
//     isLoading: isLoading2,
//   } = useQuery(
//     ["properties", id],
//     async () => GET({ endpoint: `properties?cat=${id}` }),
//     { enabled: !!id }
//   );
//   useEffect(() => {
//     console.log("Hello react query");
//     console.log("data", data);
//     console.log("error", error);
//     console.log("isLoading", isLoading);
//   }, [data, error, isLoading]);
//   useEffect(() => {
//     console.log("Hello react query 2", id);
//     console.log("data2", data2);
//     console.log("error2", error2);
//     console.log("isLoading2", isLoading2);
//   }, [data2, error2, isLoading2, id]);
//   const dispatch = useAppDispatch();
//   const { mainCategories } = useAppSelector(
//     (state: RootState) => state.categories
//   );
//   const [form] = Form.useForm<FormInstance>();
//   const [mainCategory, setMainCategory] = useState<CategorySelectProps>({
//     ...baseSelectProps({ label: "Main category", slug: "mainCategory" }),
//     onChange: (val, option) => {
//       setMainCategory((prev) => ({
//         ...prev,
//         value: val,
//       }));
//       setId(val);
//       // setSubCategory((prev) => ({
//       //   ...prev,
//       //   value: null,
//       //   options: convertCategoriesToOptions(option.children),
//       //   // options: option.children.map((cat: any) => ({
//       //   //   label: cat.name,
//       //   //   value: cat.id,
//       //   //   children: cat.children,
//       //   // })),
//       // }));
//     },
//   });
//   const [subCategory, setSubCategory] = useState({
//     ...baseSelectProps({ label: "Sub category", slug: "subCategory" }),
//     // onChange: (val, option) => {
//     //   console.log("sub category changed", val, option);
//     //   setSubCategory((prev) => ({ ...prev, value: val }));
//     // },
//   });

//   useEffect(() => {
//     dispatch(getMainCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     setMainCategory((prev) => ({
//       ...prev,
//       options: mainCategories.options,
//     }));
//   }, [mainCategories]);

//   const onSubmit = () => {
//     console.log("You just submitted the form!");
//   };
//   return (
//     <div className="w-[500px] p-4 my-4 mx-auto rounded border">
//       <Form layout="vertical" onFinish={onSubmit} form={form}>
//         <Form.Item label={mainCategory?.label} rules={[{ required: true }]}>
//           <Select {...mainCategory} />
//         </Form.Item>
//         <Form.Item label={subCategory?.label} rules={[{ required: true }]}>
//           <Select {...subCategory} />
//         </Form.Item>
//         {/* {allCategoryNestedChildren?.length > 0 &&
//           allCategoryNestedChildren.map((child) => (
//             <React.Fragment key={child?.slug}>
//               <Form.Item label={child?.label}>
//                 <Select {...child} />
//               </Form.Item>
//               {child?.value === `${child?.slug}_other-option` && (
//                 <Form.Item name={`${child?.slug}_other-option`}>
//                   <Input
//                     placeholder="Enter Other Option"
//                     style={{ border: "2px solid #9B0257" }}
//                   />
//                 </Form.Item>
//               )}
//             </React.Fragment>
//           ))} */}
//         {/* <Row justify="end" style={{ marginBottom: "30px" }} gutter={16}>
//           <Col>
//             <Button htmlType="submit" type="primary">
//               Submit
//             </Button>
//           </Col>
//           <Col>
//             <Link href="/">
//               <Button>Home Page</Button>
//             </Link>
//           </Col>
//         </Row> */}
//       </Form>
//       {/* <Col span={24}>
//         {tableArr.length > 0 && (
//           <Table
//             pagination={false}
//             dataSource={dataSource}
//             columns={tableArr}
//           />
//         )}
//       </Col> */}
//     </div>
//   );
// };

// export default Categories;

import React from "react";
import CategoriesForm from "./components/CategoriesForm";

const CategoriesPage = () => {
  return <CategoriesForm />;
};

export default CategoriesPage;
