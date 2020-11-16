import { init } from "./init";
import { renderLayout } from "./layout";
import { renderContent } from "./content";
import "./style.css";

const root = init();

const { layout, mainContent } = renderLayout();

root.appendChild(layout);

renderContent(mainContent);
