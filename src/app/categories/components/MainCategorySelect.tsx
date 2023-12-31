// import React, { useState } from "react";
// import { CategorySelectProps } from "../types";
// import { generateBaseSelectProps } from "../utils";

// const MainCategorySelect = () => {
//   const [mainCategorySelect, setMainCategorySelect] =
//     useState<CategorySelectProps>({
//       ...generateBaseSelectProps({
//         label: "Main category",
//         slug: "mainCategory",
//       }),
//       onChange: (val, option) => {
//         setMainCategorySelect((prev) => ({
//           ...prev,
//           value: val,
//         }));

//         setSubcategorySelect((prev) => ({
//           ...prev,
//           value: null,
//           options: option.children.map((cat: any) => ({
//             label: cat.name,
//             value: cat.id,
//             children: cat.children,
//           })),
//         }));
//       },
//     });
//   return (
//     <Form.Item label={mainCategorySelect?.label} rules={[{ required: true }]}>
//       <Select {...mainCategorySelect} />
//     </Form.Item>
//   );
// };

// export default MainCategorySelect;
