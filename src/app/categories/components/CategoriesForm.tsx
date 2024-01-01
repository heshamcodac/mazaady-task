"use client";
import { Button, Form, FormInstance, Input, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  SelectComponentProps,
  CategoryChildrenSelectData,
  ISelectOption,
} from "../types";
import { useQuery } from "react-query";
import { createSelectOptions, createSelectProps } from "../utils";
import { GET } from "@utils";
import styles from "./styles.module.scss";

const CategoriesForm = () => {
  // constants
  const [form] = Form.useForm<FormInstance>();
  const [tableColumns, setTableColumns] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  // 3 types of selects (main, sub, children)
  const [mainCategorySelect, setMainCategorySelect] =
    useState<SelectComponentProps>({
      ...createSelectProps({
        label: "Main category",
        slug: "mainCategory",
        onChange: (val, option: any) => {
          setMainCategorySelect((prev: any) => ({ ...prev, value: option }));
          setSubcategorySelect((prev) => ({
            ...prev,
            value: { value: null, label: "" },
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
        onChange: (val, option) => {
          console.log(option);
          setSubcategorySelect((prev) => ({
            ...prev,
            value: option,
          }));
        },
      }),
    });
  const [categoryChildrenSelects, setCategoryChildrenSelects] = useState<
    SelectComponentProps[]
  >([]);

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
    ["properties", subcategorySelect.value.value],
    async () =>
      GET({ endpoint: `properties?cat=${subcategorySelect.value.value}` }),
    { enabled: !!subcategorySelect.value.value }
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
                return { ...select, value: option };
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

  const onSubmit = (values: any) => {
    console.log("Form submitted!", values);
    let allSelects = [
      mainCategorySelect,
      subcategorySelect,
      ...categoryChildrenSelects,
    ];

    setTableColumns(
      allSelects.map((select) => ({
        title: select.label,
        dataIndex: select.slug,
      }))
    );

    setTableData([
      Object.assign(
        { key: 1 },
        ...allSelects.map((select) => ({
          [select.slug]: select.value.label,
        }))
      ),
    ]);
  };
  return (
    <>
      <div className={styles.form} dir="ltr">
        <Form layout="vertical" onFinish={onSubmit} form={form}>
          <Form.Item
            label={mainCategorySelect?.label}
            name={mainCategorySelect?.name}
            rules={[{ required: true }]}
          >
            <Select {...mainCategorySelect} />
          </Form.Item>
          <Form.Item
            label={subcategorySelect?.label}
            name={subcategorySelect?.name}
            rules={[{ required: true }]}
          >
            <Select {...subcategorySelect} />
          </Form.Item>
          {!!categoryChildrenSelects?.length &&
            categoryChildrenSelects.map((select) => (
              <React.Fragment key={select?.slug}>
                <Form.Item label={select?.label} name={select.name}>
                  <Select {...select} />
                </Form.Item>
                {select?.value.value === `${select?.slug}_other-option` && (
                  <Form.Item name={`${select?.slug}_other-option`}>
                    <Input placeholder="Enter Other Option" />
                  </Form.Item>
                )}
              </React.Fragment>
            ))}

          <button type="submit">Submit</button>
        </Form>
      </div>
      {!!tableColumns.length && !!tableData.length && (
        <Table
          pagination={false}
          dataSource={tableData}
          columns={tableColumns}
        />
      )}
    </>
  );
};

export default CategoriesForm;
