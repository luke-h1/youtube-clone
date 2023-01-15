import videoMutations from '@common/mutations/videoMutations';
import { Video } from '@common/types/video';
import {
  Button,
  Group,
  Modal,
  Progress,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useForm } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import { ArrowBigUpLine } from 'tabler-icons-react';
import { useVideos } from '../context/VideoContext';

interface Props {
  id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditVideoForm = ({ id, setOpen }: Props) => {
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      published: true,
    },
  });

  const { refetch } = useVideos();

  const editVideoMutation = useMutation({
    ...videoMutations.editVideo(),
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(values =>
        editVideoMutation.mutate({
          videoId: id,
          payload: values,
        }),
      )}
    >
      <Stack>
        <TextInput
          label="title"
          {...form.getInputProps('title')}
          required
          placeholder="title"
        />
        <TextInput
          label="description"
          {...form.getInputProps('description')}
          required
          placeholder="description"
        />

        <Switch label="published" {...form.getInputProps('published')} />

        <Button type="submit" variant="outline" color="teal">
          Save
        </Button>
      </Stack>
    </form>
  );
};

const UploadVideo = () => {
  const [open, setOPen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const uploadVideoMutation = useMutation({
    ...videoMutations.uploadVideo(),
  });

  const config = {
    onUploadProgress: (progressEvent: ProgressEvent) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );

      setProgress(percent);
    },
  };

  function upload(files: File[]) {
    const formData = new FormData();
    formData.append('video', files[0]);
    uploadVideoMutation.mutate({
      formData,
      config: config as unknown as {
        onUploadProgress: (ProgressEvent: unknown) => void;
      },
    });
  }

  return (
    <>
      <Modal
        opened={open}
        closeOnClickOutside={false}
        onClose={() => setOPen(!open)}
        title="Upload video"
        size="xl"
      >
        {progress === 0 && (
          <Dropzone
            onDrop={files => upload(files)}
            accept={[MIME_TYPES.mp4]}
            multiple={false}
          >
            {status => {
              return (
                <Group
                  position="center"
                  spacing="xl"
                  direction="column"
                  style={{
                    minHeight: '50vh',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowBigUpLine />
                  <Text>Drag video here or click to upload</Text>
                </Group>
              );
            }}
          </Dropzone>
        )}
        {progress > 0 && (
          <Progress size="xl" label={`${progress}%`} value={progress} mb="xl" />
        )}
        {uploadVideoMutation.isSuccess && uploadVideoMutation.data && (
          <EditVideoForm id={uploadVideoMutation.data.id} setOpen={setOPen} />
        )}{' '}
      </Modal>

      <Button onClick={() => setOPen(true)}>Upload video</Button>
    </>
  );
};

export default UploadVideo;
