import Layout from "../components/Layout";
import React, { useContext, useState, useEffect } from "react";
import Context from "../Context";
import gql from "graphql-tag";
import { useQuery, useLazyQuery, useMutation } from "@apollo/react-hooks";

const FILE_UPLOAD = gql`
  mutation saveFile($file: Upload!) {
    saveFile(file: $file)
  }
`;
const UPLOAD_FILE = gql`
  mutation saveFile($upload: Upload!) {
    saveFile(upload: $upload)
  }
`;

export default () => {
  const { handleChange, keyword } = useContext(Context);
  const [imgFile, setImgFile] = useState();
  const [uploadFile, { data, loading }] = useMutation(UPLOAD_FILE, {
    fetchPolicy: "no-cache",
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(imgFile);
    uploadFile({
      variables: { upload: imgFile },
      context: { hasUpload: true, useMultipart: true },
    });
  };

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    console.log(validity, file);
    if (validity.valid) {
      return setImgFile(file);
    }
    return false;
  };

  useEffect(() => {
    console.log(imgFile, "hello");
  }, [imgFile]);

  return (
    <Layout>
      <input type="text" onChange={handleChange} value={keyword} />

      <a href="https://accounts.google.com/o/oauth2/auth?client_id=235400992083-bg8h8320gvk5v4a06baig6g1cg3pr4oe.apps.googleusercontent.com&redirect_uri=http://localhost:3000&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&response_type=code&access_type=offline">
        <button type="button">연동</button>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            accept="image/*,.txt"
            multiple
            required
            capture="user"
            onChange={onChange}
          />
          <input type="submit" />
        </form>
      </a>
      <div>메인 페이지</div>
    </Layout>
  );
};
