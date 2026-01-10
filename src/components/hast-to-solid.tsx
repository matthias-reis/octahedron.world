import { type JSX, type Component } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { Element, ElementContent, Root, Text } from 'hast';
import type { Options } from 'hast-util-to-jsx-runtime';

export type ComponentMap = Options['components'];

// Void elements that should not render children
const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

/**
 * Converts HAST properties to Solid JSX props
 * Handles: className → class, style objects, boolean attributes
 */
function convertProperties(properties?: Record<string, any>): Record<string, any> {
  if (!properties) return {};

  const converted: Record<string, any> = {};

  for (const [key, value] of Object.entries(properties)) {
    // Handle className → class (Solid uses class, not className)
    if (key === 'className') {
      // className can be an array in hast
      converted.class = Array.isArray(value) ? value.join(' ') : value;
    }
    // Handle style string or object
    else if (key === 'style') {
      converted.style = value;
    }
    // Pass through other properties
    else {
      converted[key] = value;
    }
  }

  return converted;
}

/**
 * Renders an array of HAST child nodes to Solid JSX elements
 */
function renderChildren(
  children: ElementContent[] | undefined,
  components?: ComponentMap
): JSX.Element[] | undefined {
  if (!children || children.length === 0) return undefined;

  return children.map((child, index) => {
    if (child.type === 'element') {
      return renderElement(child, components);
    } else if (child.type === 'text') {
      return child.value;
    }
    // Handle other node types (comment, doctype, etc.) by returning null
    return null as any;
  });
}

/**
 * Renders a single HAST element node to a Solid JSX element
 */
function renderElement(element: Element, components?: ComponentMap): JSX.Element {
  const { tagName, properties, children } = element;

  // Check if there's a custom component for this tag
  const CustomComponent = components?.[tagName];

  // Convert properties to Solid props
  const props = convertProperties(properties);

  // Render children (unless it's a void element)
  const childElements = VOID_ELEMENTS.has(tagName)
    ? undefined
    : renderChildren(children, components);

  // If there's a custom component, use it
  if (CustomComponent) {
    return <CustomComponent {...props}>{childElements}</CustomComponent>;
  }

  // Otherwise use Dynamic to render the native HTML element
  return (
    <Dynamic component={tagName} {...props}>
      {childElements}
    </Dynamic>
  );
}

/**
 * Converts a HAST tree to Solid JSX elements
 * @param node - The HAST root or element node
 * @param components - Optional custom component mappings
 * @returns Solid JSX element(s)
 */
export function hastToSolidJsx(
  node: Root | Element | any,
  components?: ComponentMap
): JSX.Element {
  // Handle root nodes - render children as fragment
  if (node.type === 'root') {
    const children = renderChildren(node.children, components);
    if (!children || children.length === 0) {
      return null as any;
    }
    // If single child, return it directly; otherwise wrap in fragment
    return children.length === 1 ? children[0] : <>{children}</>;
  }

  // Handle element nodes
  if (node.type === 'element') {
    return renderElement(node, components);
  }

  // Handle text nodes
  if (node.type === 'text') {
    return (node as Text).value as any;
  }

  // Fallback for unexpected node types
  return null as any;
}
