"use client";
import React, { useEffect, useState } from "react";
import {
  useGetAllCategories,
  useGetPropertiesChildren,
  useGetProperties,
} from "./useCategory";
import { Button, Col, Form, Input, Row, Table, Select } from "antd";
import Link from "next/link";

const CategoriesComponent = () => {
  // constants
  const [form] = Form.useForm();
  const [tableArr, setTableArr] = useState([]);
  const [tableValues, setTableValues] = useState({});
  const dataSource = [tableValues];
  const [selectedPropertyChild, setSelectedPropertyChild] = useState(null);
  const [mainCategory, setMainCategory] = useState({
    ...baseSelectProps("Main category", "mainCategory"),
    rules: [{ required: true }],
    onChange: (val, option) => {
      setMainCategory((prev) => ({
        ...prev,
        value: val,
        name: option.name,
      }));
      setSubCategory((prev) => ({
        ...prev,
        value: null,
        options: option.children,
      }));
    },
  });
  const [subCategory, setSubCategory] = useState({
    ...baseSelectProps("sub category", "subCategory"),
    rules: [{ required: true }],
    onChange: (val, option) => {
      setSubCategory((prev) => ({ ...prev, value: val, name: option.name }));
    },
  });
  const [allCategoryNestedChildren, setAllCategoryNestedChildren] = useState(
    []
  );

  // requests
  const { data: categoriesRes, isLoading: categoriesIsloading } =
    useGetAllCategories();
  const { data: propertiesRes, isLoading: propertiesIsLoading } =
    useGetProperties(subCategory?.value);
  const {
    data: propertiesChildrenRes,
    isLoading: propertiesChildrenIsLoading,
  } = useGetPropertiesChildren(selectedPropertyChild?.id);

  // functions
  const handleTableArray = (obj) => {
    let arr = [];
    Object.entries(obj).map(([key]) => {
      arr.push({ title: key, dataIndex: key, key: key });
    });

    setTableArr(arr);
  };
  const baseSelectProps = (label, slug, id) => ({
    ...(id && { id }), // if id exist, then add it to the object
    slug: slug || label.toLowerCase(),
    label: label.charAt(0).toUpperCase() + label.slice(1),
    fieldNames: { label: "name", value: "id" },
    style: { width: "400px" },
    options: [],
    value: null,
    placeholder: `Select a ${label.toLowerCase()}`,
  });
  const generateCategoryNastedChildObj = (childObj) => ({
    ...baseSelectProps(childObj.name, childObj.slug, childObj.id),
    options: [
      {
        id: `${childObj.slug}_other-option`,
        name: "Other",
        parent: childObj.id,
      },
      ...childObj.options,
    ],
    onChange: (val, option) => {
      let insertIndex;
      setAllCategoryNestedChildren((prev) => [
        ...prev.map((child, i) => {
          if (child.id === option.parent) {
            insertIndex = i + 1;
            return { ...child, value: val, name: option.name };
          }
          return child;
        }),
      ]);
      if (option?.id && option?.child) {
        setSelectedPropertyChild({ id: option?.id, insertIndex });
      }
    },
  });
  const onFinish = (values) => {
    let tableObject = Object.assign(
      {
        mainCategory: mainCategory.name,
        subCategory: subCategory.name,
        ...values,
      },
      ...allCategoryNestedChildren.map((x) => ({ [x.label]: x.name }))
    );
    setTableValues(tableObject);
    handleTableArray(tableObject);
    form.resetFields();
  };

  // effects
  // update mainCategory options
  useEffect(() => {
    if (categoriesRes && !categoriesIsloading)
      setMainCategory({
        ...mainCategory,
        options: categoriesRes.data.data.categories,
      });
  }, [categoriesRes]);
  useEffect(() => {
    if (propertiesChildrenRes && !propertiesChildrenIsLoading) {
      const arr = [...allCategoryNestedChildren];
      let newChildindex = selectedPropertyChild?.insertIndex;
      const isNewChildExist = (child) => {
        return arr.find((itm, i) => {
          if (itm.slug === child.slug) {
            newChildindex = i;
            return true;
          }
          return false;
        });
      };

      propertiesChildrenRes?.data?.data.map((child) => {
        if (isNewChildExist(child)) {
          // if there's a match, then replace the old child with the new one.

          arr.splice(newChildindex, 1, generateCategoryNastedChildObj(child));
        } else {
          // if there's no match, then add the new child to the array.
          arr.splice(newChildindex, 0, generateCategoryNastedChildObj(child));
        }
      });
      setAllCategoryNestedChildren(arr);
    }
  }, [propertiesChildrenRes]);
  // update allCategoryNestedChildren options
  useEffect(() => {
    if (propertiesRes && !propertiesIsLoading)
      setAllCategoryNestedChildren(
        propertiesRes?.data?.data?.map((child) => ({
          ...generateCategoryNastedChildObj(child),
        }))
      );
  }, [propertiesRes]);

  return (
    <Row gutter={60}>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label={mainCategory?.label} rules={mainCategory?.rules}>
          <Select {...mainCategory} />
        </Form.Item>
        <Form.Item label={subCategory?.label} rules={subCategory?.rules}>
          <Select {...subCategory} />
        </Form.Item>
        {allCategoryNestedChildren?.length > 0 &&
          allCategoryNestedChildren.map((child) => (
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
        <Row justify="end" style={{ marginBottom: "30px" }} gutter={16}>
          <Col>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Col>
          <Col>
            <Link href="/home-page">
              <Button>Home Page</Button>
            </Link>
          </Col>
        </Row>
      </Form>
      <Col span={24}>
        {tableArr.length > 0 && (
          <Table
            pagination={false}
            dataSource={dataSource}
            columns={tableArr}
          />
        )}
      </Col>
    </Row>
  );
};

export default CategoriesComponent;
