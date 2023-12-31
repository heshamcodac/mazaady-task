"use client";
import { useAppDispatch } from "@hooks";
import { Form, FormInstance, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  SelectComponentProps,
  ISelectOption,
  CategoryChildrenSelectData,
} from "../types";
import { useQuery } from "react-query";
import { createSelectOptions, createSelectProps } from "../utils";
import { GET } from "@utils";

const CategoriesForm = () => {
  // constants
  const [form] = Form.useForm<FormInstance>();
  // 3 types of selects (main, sub, children)
  const [mainCategorySelect, setMainCategorySelect] =
    useState<SelectComponentProps>({
      ...createSelectProps({
        label: "Main category",
        slug: "mainCategory",
        onChange: (val: any, option: any) => {
          setMainCategorySelect((prev: any) => ({ ...prev, value: val }));
          setSubcategorySelect((prev) => ({
            ...prev,
            value: null,
            options: createSelectOptions(option.children),
          }));
          setCategoryChildrenSelects([]);
        },
      }),
    });
  const [subcategorySelect, setSubcategorySelect] =
    useState<SelectComponentProps>({
      ...createSelectProps({
        label: "Subcategory",
        slug: "subcategory",
        onChange: (val) => {
          setSubcategorySelect((prev) => ({ ...prev, value: val }));
        },
      }),
    });
  const [categoryChildrenSelects, setCategoryChildrenSelects] = useState<
    SelectComponentProps[]
  >([]);

  const [selectedCategoryChild, setSelectedCategoryChild] = useState<{
    id: string | null;
    insertIndex: number | null;
  }>({ id: null, insertIndex: null });

  const [selectedCategoryChildId, setSelectedCategoryChildId] = useState<
    string | null
  >(null);
  const [newCategoryChildIndex, setNewCategoryChildIndex] = useState<
    number | null
  >(null);

  // requests
  const { data: categoriesRes, isLoading: categoriesIsLoading } = useQuery(
    "categories",
    async () => GET({ endpoint: "get_all_cats" })
  );
  const { data: propertiesRes, isLoading: propertiesIsLoading } = useQuery(
    ["properties", subcategorySelect.value],
    async () => GET({ endpoint: `properties?cat=${subcategorySelect.value}` }),
    { enabled: !!subcategorySelect.value }
  );
  const { data: nestedPropertiesRes, isLoading: nestedPropertiesIsLoading } =
    useQuery(
      ["get-options-child", selectedCategoryChildId],
      async () =>
        GET({ endpoint: `get-options-child/${selectedCategoryChildId}` }),
      { enabled: !!selectedCategoryChildId }
    );

  // update mainCategorySelect
  useEffect(() => {
    if (categoriesRes)
      setMainCategorySelect((prev) => ({
        ...prev,
        loading: categoriesIsLoading,
        options: createSelectOptions(categoriesRes?.data?.categories, [
          "children",
        ]),
      }));
  }, [categoriesRes, categoriesIsLoading]);

  const createCategoryChildSelect = (
    select: CategoryChildrenSelectData
  ): SelectComponentProps => {
    return {
      ...createSelectProps({
        label: select.name,
        slug: select.slug,
        id: select.id,
        options: [
          {
            value: `${select.slug}_other-option`,
            label: "Other",
            parent: select.id,
          },
          ...createSelectOptions(select.options, ["parent", "child"]),
        ],
        onChange: (val, option) => {
          let insertIndex: number | null = null;
          console.log(
            "You just selected an option of category child select",
            option
          );
          setCategoryChildrenSelects((prev) => [
            ...prev.map((select, i) => {
              if (select.id === option.parent) {
                insertIndex = i + 1;
                return { ...select, value: val };
              }
              return select;
            }),
          ]);
          // if selected option has child
          if (option?.value && option?.child) {
            setNewCategoryChildIndex(insertIndex);
            setSelectedCategoryChildId(val);
          }
        },
      }),
    };
  };

  useEffect(() => {
    if (propertiesRes && !propertiesIsLoading) {
      const childrenArr: SelectComponentProps[] = [];
      propertiesRes?.data?.map((select: CategoryChildrenSelectData) => {
        childrenArr.push({ ...createCategoryChildSelect(select) });
      });
      setCategoryChildrenSelects(childrenArr);
    }
  }, [propertiesRes, propertiesIsLoading]);

  useEffect(() => {
    if (nestedPropertiesRes && !nestedPropertiesIsLoading) {
      console.log(nestedPropertiesIsLoading, nestedPropertiesRes);
      const arr = [...categoryChildrenSelects];
      let childIndex: number | null = newCategoryChildIndex;
      const isNewChildExist = (select: CategoryChildrenSelectData) => {
        return arr.find((itm, i) => {
          if (itm.slug === select.slug) {
            childIndex = i;
            return true;
          }
          return false;
        });
      };
      nestedPropertiesRes?.data?.map((select: CategoryChildrenSelectData) => {
        if (childIndex !== null)
          arr.splice(
            childIndex,
            isNewChildExist(select) ? 1 : 0,
            createCategoryChildSelect(select)
          );
      });
      setCategoryChildrenSelects(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nestedPropertiesRes, nestedPropertiesIsLoading]);

  const onSubmit = () => {
    console.log("Form submitted!");
  };
  return (
    <div className="w-[500px] p-4 my-4 mx-auto rounded border" dir="ltr">
      <Form layout="vertical" onFinish={onSubmit} form={form}>
        <Form.Item
          label={mainCategorySelect?.label}
          rules={[{ required: true }]}
        >
          <Select {...mainCategorySelect} />
        </Form.Item>
        <Form.Item
          label={subcategorySelect?.label}
          rules={[{ required: true }]}
        >
          <Select {...subcategorySelect} />
        </Form.Item>
        {!!categoryChildrenSelects?.length &&
          categoryChildrenSelects.map((child) => (
            <React.Fragment key={child?.slug}>
              <Form.Item label={child?.label}>
                <Select {...child} />
              </Form.Item>
              {child?.value === `${child?.slug}_other-option` && (
                <Form.Item name={`${child?.slug}_other-option`}>
                  <Input
                    placeholder="Enter Other Option"
                    style={{ border: "2px solid #9B0257" }}
                  />
                </Form.Item>
              )}
            </React.Fragment>
          ))}
      </Form>
    </div>
  );
};

export default CategoriesForm;
