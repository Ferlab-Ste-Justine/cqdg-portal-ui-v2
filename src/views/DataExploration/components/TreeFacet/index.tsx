import { useDispatch } from 'react-redux';

import CollapseLikeFacet from 'components/uiKit/FilterList/CollapsePlaceHolderFacet';
import { remoteSliceActions } from 'store/remote/slice';
import { RemoteComponentList } from 'store/remote/types';

interface ITreeFacetProps {
  type: RemoteComponentList;
  field: string;
  title: string;
}

const TreeFacet = ({ type, field, title }: ITreeFacetProps) => {
  const dispatch = useDispatch();

  return (
    <CollapseLikeFacet
      key={field}
      title={title}
      onClick={() =>
        dispatch(
          remoteSliceActions.openRemoteComponent({
            id: type,
            props: { visible: true },
          }),
        )
      }
    />
  );
};

export default TreeFacet;
