import icons from "@/constants/icons";
import FullSafeAreaScreen from "@/components/FullSafeAreaScreen";

import {
  ThemedBorder,
  ThemedIcon,
  ThemedText,
} from "@/components/ui/themed-components";
import { useGlobalContext } from "@/libs/global-provider";
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { logout } from "@/libs/appwrite";
import { settings } from "@/constants/data";
import { useTheme } from "@/contexts/ThemeProvider";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
  isArray: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow,
  isArray,
}: SettingsItemProps) => {
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center justify-between py-3"
    >
      <View className="flex flex-row items-center gap-3">
        <Image
          tintColor={isArray ? (isDarkMode ? "white" : "black") : ""}
          source={icon}
          className="size-6"
        />
        <ThemedText className={`text-lg font-rubik-medium ${textStyle}`}>
          {title}
        </ThemedText>
      </View>

      {showArrow && (
        <Image
          tintColor={isDarkMode ? "white" : "black"}
          source={icons.chevronLeft}
          className="size-5 rotate-180"
        />
      )}
    </TouchableOpacity>
  );
};

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <FullSafeAreaScreen>
      <View className="flex flex-row items-center justify-between">
        <ThemedText className="text-xl font-rubik-bold">Profile</ThemedText>
        <ThemedIcon icon={icons.user} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
      >
        <View className="flex flex-col justify-center mt-5 mb-3">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-36 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-0 left-48 bg-rose-500 rounded-full p-2">
              <Image
                tintColor={"white"}
                source={icons.pen}
                className="size-6"
              />
            </TouchableOpacity>
          </View>
          <ThemedText className="text-2xl text-center font-rubik-bold mt-2">
            {user?.name}
          </ThemedText>
        </View>

        {/* <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View> */}

        <ThemedBorder className="w-full" />

        <View className="flex flex-col mt-5 pt- mb-2">
          {settings.map((item, index) => (
            <SettingsItem isArray={true} key={index} {...item} />
          ))}
        </View>

        <ThemedBorder className="w-full" />
        <View className="flex flex-col pt-2">
          <SettingsItem
            isArray={false}
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </FullSafeAreaScreen>
  );
};

export default Profile;
