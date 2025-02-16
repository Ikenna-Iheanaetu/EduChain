import First from "@/assets/avatars/first.png";
import Second from "@/assets/avatars/second.png";
import Third from "@/assets/avatars/third.png";
import Fourth from "@/assets/avatars/fourth.png";
import Fifth from "@/assets/avatars/fifth.png";
import Sixth from "@/assets/avatars/sixth.jpeg";

export const pickAnImage = (imageNumber: number) => {
  switch (imageNumber) {
    case 1:
      return First;

    case 2:
      return Second;

    case 3:
      return Third;

    case 4:
      return Fourth;

    case 5:
      return Fifth;

    case 6:
      return Sixth;

    default:
      break;
  }
};
