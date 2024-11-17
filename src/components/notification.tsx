import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getNotifications, getUnreadNotificationsCount, markAllAsRead, markAsRead } from "@/services/userService";
import { Notif } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bell, ChevronRight } from "lucide-react";

export function Notification() {
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);
    const [notified, setNotified] = useState(false);
    const [notifications, setNotifications] = useState<Notif[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const fetchNotifications = (async () => {
            try {
                const { data } = await getNotifications();
                data.forEach((notification: Notif) => {
                    notification.date = new Date(notification.date).toLocaleDateString();
                });
                console.log("Notifications:", data);
                setNotifications(data);
                if(unreadCount > 0 && !notified){
                    toast({
                        description:
                            "You have new notifications!",
                        duration: 2000,
                        variant: "warning",
                    });
                    setNotified(true);
                }
            } catch (error) {
                console.error(error);
            }
            console.log(notifications);
        });
        fetchNotifications();
    }, []);

    useEffect(() => {
        const fetchUnreadNotificationsCount = async () => {
            try {
                const response = await getUnreadNotificationsCount();
                setUnreadCount(response.unreadCount);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUnreadNotificationsCount();
    }, []);

    const handleNotificationClick = async (notification: Notif) => {
        navigate(`/scholarship/${notification.scholarshipId._id}`);
        try {
            const response = await markAsRead(notification._id);
            console.log("Mark as read response:", response);
            setNotifications((prevNotifications) =>
                prevNotifications.map((notif) =>
                    notif._id === notification._id ? { ...notif, isRead: true } : notif
                )
            );
        } catch (error) {
            console.error(error);
        }
        console.log("Notification clicked:", notification);
    };

    const handleAllRead = async () => {
        try {
            const response = await markAllAsRead();
            console.log("Mark all as read response:", response);
            setNotifications((prevNotifications) =>
                prevNotifications.map((notif) => ({ ...notif, isRead: true }))
            );
            setUnreadCount(0);
            toast({
                description:
                    "All notifications marked as read!",
                duration: 2000,
                variant: "warning",
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-6 w-6" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0.5 right-1.5 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-96 bg-white rounded-lg shadow-lg border border-gray-200 mt-2 space-y-2 max-h-80 overflow-y-auto"
            >
                {notifications.length === 0 ? (
                    <DropdownMenuItem disabled className="text-gray-500 text-center">No notifications</DropdownMenuItem>
                ) : (
                    <>
                        {notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification._id}
                                onClick={() => handleNotificationClick(notification)}
                                className="flex justify-between items-center px-6 py-3 text-sm text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                            >
                                <span className={`flex-grow ${notification.isRead ? '' : 'font-bold'}`}>
                                    {notification.message}
                                </span>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-500">{notification.date}</span>
                                    <ChevronRight className="text-gray-400 ml-6" />
                                </div>
                            </DropdownMenuItem>
                        ))}
                        {unreadCount > 0 && 
                            <div className="px-4 py-2">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleAllRead}
                                >
                                    Mark all as read
                                </Button>
                            </div>
                        }
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
