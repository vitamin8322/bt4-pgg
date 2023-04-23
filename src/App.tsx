import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setData,
  resetUpdatedTitles,
  fetchItems,
} from "./redux/slice/itemsSlice";
import { RootState } from "./redux/store";
import { Item } from "./models/itemModel";
import PhotoListItem from "./component/PhotoItem";
import Button from "./component/Button";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ContentLoader from "react-content-loader";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const { data, editingId, updatedTitles, status } = useSelector(
    (state: RootState) => state.items
  );

  const startRef = useRef<number>(0);
  const endRef = useRef<number>(10);

  useEffect(() => {
    dispatch(fetchItems({ start: startRef.current, end: endRef.current }));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        status !== "loading"
      ) {
        startRef.current += 10;
        endRef.current += 10;
        dispatch(
          fetchItems({ start: startRef.current, end: endRef.current })
        ).then((resultAction) => {
          const newData = resultAction.payload;
          dispatch(setData([...data, ...newData]));
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, status, data]);

  // console.log(data);

  const handleConfirmUpdate = () => {
    const updatedData = data.map((item) => {
      if (updatedTitles[item.id]) {
        return { ...item, title: updatedTitles[item.id] };
      }
      return item;
    });
    dispatch(setData(updatedData));
    dispatch(resetUpdatedTitles());
  };

  const handleReset = () => {
    dispatch(resetUpdatedTitles());
  };

  return (
    <div className="flex items-center flex-col">
      <h1>Item List</h1>
      <div>
        <Button
          disabled={!Object.keys(updatedTitles).length}
          onClick={handleConfirmUpdate}
        >
          Confirm Update
        </Button>
        <Button
          disabled={!Object.keys(updatedTitles).length}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      {data.map((photo) => (
        <PhotoListItem key={photo.id} photo={photo} currentTime={Date.now()} />
      ))}
      {status === "loading" && (
        <ContentLoader
          speed={2}
          width={650}
          height={170}
          viewBox="0 0 650 170"
          backgroundColor="#c8bfbf"
          foregroundColor="#ecebeb"
        >
          <rect x="180" y="130" rx="3" ry="3" width="500" height="60"  />

          <rect x="0" y="160" rx="3" ry="3" width="100" height="60" />
          <rect x="0" y="0" rx="5" ry="5" width="150" height="150" />
        </ContentLoader>
      )}
    </div>
  );
}

export default App;
