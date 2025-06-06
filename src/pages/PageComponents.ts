import { AssertionsComponents } from "../components/AssertionsComponents";
import { HeaderComponents } from "../components/HeaderComponents";
import { HelperComponents } from "../components/HelperComponents";
import * as CategoryComponent from "../components/CategoryComponent";
import * as Inputs from "../components/Inputs";
import { ActionsComponents } from "../components/ActionsComponents";
import { NavigationComponent } from "../components/NavigationComponent";

//group all components for easy use across pom's
export interface PageComponents {
  actions?: ActionsComponents;
  assertions?: AssertionsComponents;
  helper?: HelperComponents;
  header?: HeaderComponents;
  navigation?: NavigationComponent;
  category?: typeof CategoryComponent;
  input?: typeof Inputs;
}
