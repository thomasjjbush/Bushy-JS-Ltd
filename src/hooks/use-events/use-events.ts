import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from '@store/store';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Comment, Like } from '@types';

interface Actions {
  addComment: ActionCreatorWithPayload<Comment | Like>;
  addLike: ActionCreatorWithPayload<Comment | Like>;
  deleteComment: ActionCreatorWithPayload<Comment | Like>;
  deleteLike: ActionCreatorWithPayload<Comment | Like>;
}

export function useEvents(actions: Actions) {
  const dispatch = useDispatch();

  const { slug } = useParams();

  useEffect(() => {
    const eventStream = new EventSource(`${process.env.API_DOMAIN as string}/events/${slug}`, {
      withCredentials: true,
    });

    eventStream.onmessage = function onMessage({ data }: MessageEvent) {
      const { payload, type } = JSON.parse(data);
      dispatch(actions[type as keyof Actions](payload));
    };

    return () => eventStream.close();
  }, [slug]);
}
