import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getNotifications, markAsRead } from "@/services/userService";
import { Notif } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bell, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

export function Notification() {
    const navigate = useNavigate();
    const [unreadCount, setUnreadCount] = useState(0);
    const [notified, setNotified] = useState(false);
    const [notifications, setNotifications] = useState<Notif[]>([]);

    const fetchNotifications = useCallback(async () => {
        try {
            const { data } = await getNotifications();
            data.forEach((notification: Notif) => {
                notification.date = new Date(notification.date).toLocaleDateString();
            });
            console.log("Notifications:", data);
            setNotifications(data);
            setUnreadCount(notifications.filter(notification => notification.isRead === false).length);
            if(unreadCount > 0 && !notified){
                toast.warn("You have new notifications!");
                setNotified(true);
            }
            console.log("Unread count:", unreadCount);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const handleNotificationClick = async (notification: Notif) => {
        navigate(`/scholarship/${notification.scholarshipId}`);
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
                    notifications.map((notification) => (
                        <DropdownMenuItem
                            key={notification._id}
                            onClick={() => handleNotificationClick(notification)}
                            className="flex justify-between items-center px-6 py-3 text-sm text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                        >
                            <span>{notification.message}</span>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
                                <span style={{ fontSize: '10px' }}>{notification.date}</span>
                                <ChevronRight
                                    style={{ marginLeft: '1.5rem' }}
                                    className="text-gray-400"
                                />
                            </div>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
