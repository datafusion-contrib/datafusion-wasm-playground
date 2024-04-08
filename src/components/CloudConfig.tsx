import { Button, PasswordInput, TextInput, Tooltip, rem } from "@mantine/core";
import { dfCtx } from "../App";
import { atom, useAtom } from "jotai";
import { useRef } from "react";

const s3SavedAtom = atom(false)

export function CloudConfig() {
  const [s3Saved, setS3Saved] = useAtom(s3SavedAtom);

  const rootRef = useRef<HTMLInputElement>(null);
  const bucketRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const accessKeyIdRef = useRef<HTMLInputElement>(null);
  const secretAccessKeyRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="">
        <text className="italic c-gray">Make sure the CORS permission is configured properly in your cloud storage provider</text>
        <div >
          <h2 className="text-center">AWS S3</h2>
          <TextInput
            type="string"
            label="Root"
            ref={rootRef}
          />
          <TextInput
            type="string"
            label="Bucket"
            ref={bucketRef}
          />
          <TextInput
            type="string"
            label="Region"
            ref={regionRef}
          />
          <TextInput
            type="string"
            label="Access Key ID"
            ref={accessKeyIdRef}
          />
          <PasswordInput label="Secret Access Key" ref={secretAccessKeyRef} />

          <div className="text-center">

            <Tooltip
              className="inline-block "
              label="Saved!"
              offset={5}
              position="bottom"
              radius="m"
              transitionProps={{ duration: 100, transition: 'slide-down' }}
              opened={s3Saved}
            >
              <Button
                className="m-t-4"
                variant="outline"
                rightSection={
                  s3Saved ? (
                    <div className="i-tabler-square-rounded-check" style={{ width: rem(20), height: rem(20) }} />
                  ) : (
                    <div className="i-tabler-device-floppy" style={{ width: rem(20), height: rem(20) }} />
                  )
                }
                radius="m"
                size="m"
                styles={{
                  root: { paddingRight: rem(14), height: rem(48) },
                  section: { marginLeft: rem(22) },
                }}
                onClick={() => {
                  // Get the values from the input elements
                  const root = rootRef.current ? rootRef.current.value : '';
                  const bucket = bucketRef.current ? bucketRef.current.value : '';
                  const region = regionRef.current ? regionRef.current.value : '';
                  const accessKeyId = accessKeyIdRef.current ? accessKeyIdRef.current.value : '';
                  const secretAccessKey = secretAccessKeyRef.current ? secretAccessKeyRef.current.value : '';

                  // Set the values to dfCtx
                  dfCtx.set_s3_config(root, bucket, region, accessKeyId, secretAccessKey);

                  // Show the tooltip
                  setS3Saved(true);

                  // Clear the tooltip after 2 seconds
                  setTimeout(() => {
                    setS3Saved(false);
                  }, 2000);
                }}
              >
                Save
              </Button>
            </Tooltip>
          </div>
        </div>

        <hr className="c-gray" />

      </div>
    </>
  );
}
