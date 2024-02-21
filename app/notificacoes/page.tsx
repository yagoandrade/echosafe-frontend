"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import Sidemenu from "@/components/sidemenu";
import { useEffect, useState } from "react";
import { IMessage } from "../report/components/chat-box/types";
import { useCurrentUserStore } from "@/store/currentUser";
import { auth } from "@/config/firebase";
import { Card } from "@/components/ui/card";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationRounded from "./components/Pagination/PaginationRounded";
import React from "react";

const Notification = () => {
  const { userData } = useCurrentUserStore();

  // const [notifications, setNotifications] = useState<IMessage[]>([]);
  const notifications = [
    {
      id: 0,
      title: 'Esse é um título de exemplo de notificaçãoooooooooooooooooooooooooooooooooooooooooooooooo',
      image: 'string',
      date: '02/02/2024'
    },
    {
      id: 1,
      title: 'Notificação 1',
      image: 'imagem1.jpg',
      date: '03/02/2024'
    },
    {
      id: 2,
      title: 'Notificação 2',
      image: 'imagem2.jpg',
      date: '04/02/2024'
    },
    {
      id: 3,
      title: 'Notificação 3',
      image: 'imagem3.jpg',
      date: '05/02/2024'
    },
    {
      id: 4,
      title: 'Notificação 4',
      image: 'imagem4.jpg',
      date: '06/02/2024'
    },
    {
      id: 5,
      title: 'Notificação 5',
      image: 'imagem5.jpg',
      date: '07/02/2024'
    },
    {
      id: 6,
      title: 'Notificação 6',
      image: 'imagem6.jpg',
      date: '08/02/2024'
    },
    {
      id: 7,
      title: 'Notificação 7',
      image: 'imagem7.jpg',
      date: '09/02/2024'
    },
    {
      id: 8,
      title: 'Notificação 8',
      image: 'imagem8.jpg',
      date: '10/02/2024'
    },
    {
      id: 9,
      title: 'Notificação 9',
      image: 'imagem9.jpg',
      date: '11/02/2024'
    },
    {
      id: 10,
      title: 'Notificação 10',
      image: 'imagem10.jpg',
      date: '12/02/2024'
    }
  ];


  const itemsPerPage = 5;
  const pageCount = Math.ceil(notifications.length / itemsPerPage);

  const [currentPage, setCurrentPage] = React.useState(1);

  const getNotificationsForPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return notifications.slice(startIndex, endIndex);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setCurrentPage(newPage);
  };

  const [avatarSrc, setAvatarSrc] = useState(
    "https://echosafe-images-bucket.s3.sa-east-1.amazonaws.com/yago.andrade_an_asian_female_programmer_sitting_beside_a_comput_7f318946-d59e-4166-8b1f-d6cc051cfe13.png"
  );

  const schoolName = "Instituto de Computação";
  const schoolImgSrc =
    "https://echosafe-images-bucket.s3.sa-east-1.amazonaws.com/ic.png";

  // useEffect(() => {
  //   const notifications = JSON.parse(
  //     localStorage.getItem("@notifications") ?? "[]"
  //   );
  //     setNotifications(notifications);
  // }, []);

  const user = auth.currentUser;

  return (
    <div className="flex w-full justify-start pr-8">
      <Sidemenu />
      <div className="flex w-full flex-col p-6 lg:py-6 lg:pr-6">
        <div className="flex w-full flex-wrap justify-between gap-6 py-3">
          {user?.displayName ?? userData.name ? (
            <h1 className="font-bold">
              Bem-vindo, {user?.displayName ?? userData.name}
            </h1>
          ) : null}
          <div className="flex w-full items-center justify-between gap-4 lg:w-fit xl:gap-6">
            <div>
              <h1 className="text-sm uppercase text-[#71717A]">Gerenciando</h1>
              <p className="text-lg font-bold text-[#4F46E5]">{schoolName}</p>
            </div>
            {/*
              TODO: Reabilitar quando tivermos as páginas de instituição
              <Link
                href="/instuicao/santissimo-senhor"
                className="h-full w-fit flex items-center justify-end"
              > */}
              {/* </Link> */}
            </div>
          </div>
          <Breadcrumbs />

          {getNotificationsForPage().map((notification, index) => (
            <span key={index} className="">
              <Card className="flex justify-between w-full border-none bg-color-none p-[15px]">
                <div className="flex items-center" >
                  <div>
                    <img src={avatarSrc} className="rounded-full min-w-[50px] max-w-[50px] " />

                  </div>

                  <div className="flex p-3">
                    <span className="w-full flex flex-col whitespace-normal">
                      <p className="font-bold text-sm break-words max-w-[150px] sm:max-w-full ">
                        {notification.title}
                      </p>
                      <p className="font-light text-xs">{new Date(notification.date).toLocaleDateString()}
                      </p>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col-reverse justify-end lg:px-[100px] sm:px-0">
                  <button >
                    <img src="\assets\svg\svg.svg" alt="" />
                  </button>
                </div>
              </Card>
            </span>
          ))}

          <Stack spacing={2} justifyContent="center"
        alignItems="center"
          style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            backgroundColor: 'white',  // Altere para a cor desejada
            padding: '10px',
            borderTop: '1px solid #e0e0e0',
          }}>
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handleChangePage}
              shape="rounded"
              color="secondary"

            />

          </Stack>
        </div>
      </div>

  );
};

export default Notification;
