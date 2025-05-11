import {Ref} from "vue";

export interface Option {
	label: string |Ref<string>;
	action?: () => void;
	options?: (Option | Ref<Option>)[];
	level?: number;
	active?: Ref<boolean, boolean>;
}
