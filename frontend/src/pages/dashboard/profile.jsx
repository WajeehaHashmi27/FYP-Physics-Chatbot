import React from "react";
import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";

export function Profile() {
  return (
    <>
      <div
        className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-cover bg-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/background-image.png)`,
        }}
      >
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center gap-6">
            <div className="flex items-center gap-6">
              {/* Hardcoded profile photo and name */}
              <Avatar
                src="/path-to-your-hardcoded-image.jpg"
                alt="hardcoded-profile"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Your Hardcoded Name
                </Typography>
                {/* You can remove the following line if you don't want a subtitle */}
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  CEO / Co-Founder
                </Typography>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
