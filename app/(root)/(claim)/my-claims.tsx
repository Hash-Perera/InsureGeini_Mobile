import ClaimCardList from "@/components/claim-card";
import { useRouter } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";

export default function MyClaims() {
  const router = useRouter();

  const cards = [
    {
      id: "65a3b9e47c6a01e3b87e1234",
      icon: "assignment",
      title: "Claim 1",
      subtitle: "Submit a claim",
      onPress: () => router.push("/65a3b9e47c6a01e3b87e1234" as any),
    },
    {
      id: "65a3b9e47c6a01e3b87e1231",
      icon: "history",
      title: "Claim 2",
      subtitle: "View claim history",
      onPress: () => router.push("/65a3b9e47c6a01e3b87e1231" as any),
    },
    {
      id: "65a3b9e47c6a01e3b87e1232",
      icon: "support-agent",
      title: "Claim 3",
      subtitle: "Contact support",
      onPress: () => router.push("/65a3b9e47c6a01e3b87e1232" as any),
    },
    {
      id: "65a3b9e47c6a01e3b87e1233",
      icon: "info-outline",
      title: "Claim 4",
      subtitle: "Get more details",
      onPress: () => router.push("/65a3b9e47c6a01e3b87e1233" as any),
    },
    {
      id: "65a3b9e47c6a01e3b87e1235",
      icon: "warehouse",
      title: "Claim 5",
      subtitle: "Get more details",
      onPress: () => router.push("/65a3b9e47c6a01e3b87e1235" as any),
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      <ClaimCardList data={cards} />
    </SafeAreaView>
  );
}
