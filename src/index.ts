//Components
export { accordion } from './components/accordion';
export { AvatarArrayComponent } from './components/avatarArray/avatarArray.component';
export { CardComponent } from './components/card/card.component';
export { materialInput } from './components/materialInput/materialInput.component';
export { Radio } from './components/radio/radio.components';
export { Checkbox } from './components/checkbox/checkbox.components';
export { colorPicker } from './components/colorPicker/colorPicker.component';
export { ExpandableList } from './components/expandableList/expandableList.component';
export { ExpandableItem } from './components/expandableList/expandableItem';
export { ExpandableContentComponent } from './components/expandableContent/expandableContent.component';
export { savingState } from './components/savingState/savingState.component';
export { contentBoxes } from './components/contentBoxes';
export { editableInput } from './components/editableInput';
export { expandable } from './components/expandable';
export { formField } from './components/formField';
export { iconDpr } from './components/icon-dpr';
export { IconComponent } from './components/icon/icon.component';
export { iconButton } from './components/iconButton';
export { InfoHeader } from './components/infoHeader/infoHeader.component';
export { inputList } from './components/inputList';
export { ScrollContentComponent } from './components/scrollContent';
export { sidenavMenu } from './components/sidenavMenu';
export { sidenavMenuItem } from './components/sidenavMenuItem';
export { SwitchComponent } from './components/switch';
export { TimepickerComponent } from './components/timepicker';
export { ToggleButtonComponent } from './components/toggleButton';
export { dropdownItem } from './components/dropdownItem';
export { ChipsComponent } from './components/chips/chips.component';
import { default as ContentTabsComponent } from './components/contentTabs';
import { TabComponent } from './components/contentTabs/tab';
import { SubheaderIconsComponent } from './components/subheaderIcons/subheaderIcons.component';
import { LocalLoadingComponent } from './components/loading/localLoading.component';
import { SearchInputComponent } from './components/searchInput/searchInput.component';
import { ListItemsComponent } from './components/listItems/listItems.component';
import { ListItemComponent } from './components/listItem/listItem.component';
import { CustomSelectComponent } from './components/customSelect/customSelect.component';
import { SelectItemComponent } from './components/customSelect/selectItem/selectItem.component';
import { BuilderNodeComponent } from './components/builderNode/builderNode.component';
import { ActionsBarComponent } from './components/actionsBar/actionsBar.component';
import { KeyValueComponent } from './components/keyValue/keyValue.component';
import { KeyValueItemComponent } from './components/keyValue/keyValueItem.component';
import { InputClipboardComponent } from './components/inputClipboard/inputClipboard.component';
import { letterAvatar } from './components/letterAvatar';
import { TooltipButtonComponent } from './components/tooltipButton/tooltipButton.component';
import { ReloadButtonComponent } from './components/reloadButton/reloadButton.component';
import { StatusBar } from './components/statusBar/statusBar.component';
import { PageHelp } from './components/pageHelp/pageHelp.component';
import { ConfusionMatrix } from './components/confusionMatrix/confusionMatrix.component';
import { LoadingIconComponent } from './components/loadingIcon/loadingIcon.component';
import { FilterByComponent } from './components/filterBy/filterBy.component';
import { DateRangePickerComponent } from './components/dateRangePicker/dateRangePicker.component';
import { AddRemoveComponent } from './components/addRemove/addRemove.component';
import { BlipSelectComponent } from './components/blipSelect/blipSelect.component';
import { BlipCheckboxComponent } from './components/blipCheckbox/blipCheckbox.component';
import { BlipInputComponent } from './components/blipInput/blipInput.component';
import { BlipRadioComponent } from './components/blipRadio/blipRadio.component';
import { BlipTextareaComponent } from './components/blipTextarea/blipTextarea.component';
import { BlipTagsComponent } from './components/blipTags/blipTags.component';
import { MonacoEditorComponent } from './components/monacoEditor/monacoEditor.component';
import { ThreadMessagesComponent } from './components/threadMessages/threadMessages.component';
import { ImpactCircleComponent } from './components/impactCircle/impactCircle.component';
import { BuilderSearchComponent } from './components/builderSearch/builderSearch.component';
import { UserMenuComponent } from './components/userMenu/userMenu.component';
import { BlipFooterComponent } from './components/blipFooter/blipFooter.component';

//Directives
import { PageHeaderDirective } from './components/pageHeader/PageHeaderDirective';
import { OnErrorSrcDirective } from './components/onErrorSrc/onErrorSrc.directive';

import { IComponentOptions } from 'angular';
import { sharedModules } from './modules';

export const module = (function(ng) {
    return ng.module('blip-components', [sharedModules])
        // .component('accordion', accordion)
        // .component('avatarArray', AvatarArrayComponent)
        // .component('card', CardComponent)
        // .component('materialInput', materialInput)
        // .component('radio', Radio)
        // .component('checkbox', Checkbox)
        // .component('colorPicker', colorPicker)
        // .component('expandableList', ExpandableList)
        // .component('expandableItem', ExpandableItem)
        // .component('expandableContent', ExpandableContentComponent)
        // .component('savingState', savingState)
        // .component('contentBoxes', contentBoxes)
        // .component('editableInput', editableInput)
        // .component('expandable', expandable)
        // .component('formField', formField)
        // .component('iconDpr', iconDpr)
        // .component('icon', IconComponent)
        // .component('iconButton', iconButton)
        // .component('infoHeader', InfoHeader)
        // .component('inputList', inputList)
        // .component('scrollContent', ScrollContentComponent)
        // .component('sidenavMenu', sidenavMenu)
        // .component('sidenavMenuItem', sidenavMenuItem)
        // .component('switch', SwitchComponent)
        // .component('timepicker', TimepickerComponent)
        // .component('toggleButton', ToggleButtonComponent)
        // .component('dropdownItem', dropdownItem)
        // .component('chips', ChipsComponent)
        // .component('contentTabs', ContentTabsComponent)
        // .component('tab', TabComponent)
        // .component('confusionMatrix', ConfusionMatrix)
        // .component('letterAvatar', letterAvatar)
        // .component('subheaderIcons', SubheaderIconsComponent)
        // .component('localLoading', LocalLoadingComponent)
        // .component('searchInput', SearchInputComponent)
        // .component('listItems', ListItemsComponent)
        .component('listItem', ListItemComponent)
        .component('customSelect', CustomSelectComponent)
        .component('selectItem', SelectItemComponent)
        .component('builderNode', BuilderNodeComponent)
        .component('actionsBar', ActionsBarComponent)
        .component('keyValue', KeyValueComponent)
        .component('keyValueItem', KeyValueItemComponent)
        .component('inputClipboard', InputClipboardComponent)
        .component('tooltipButton', TooltipButtonComponent)
        .component('reloadButton', ReloadButtonComponent)
        .component('statusBar', StatusBar)
        .component('pageHelp', PageHelp)
        .component('loadingIcon', LoadingIconComponent)
        .component('filterBy', FilterByComponent)
        .component('dateRangePicker', DateRangePickerComponent)
        .component('blipCheckbox', BlipCheckboxComponent)
        .component('blipInput', BlipInputComponent)
        .component('blipRadio', BlipRadioComponent)
        .component('addRemove', AddRemoveComponent)
        .component('blipSelect', BlipSelectComponent)
        .component('blipTextarea', BlipTextareaComponent)
        .component('blipTags', BlipTagsComponent)
        .component('monacoEditor', MonacoEditorComponent)
        .component('threadMessages', ThreadMessagesComponent)
        .component('impactCircle', ImpactCircleComponent)
        .component('builderSearch', BuilderSearchComponent)
        .component('userMenu', <IComponentOptions>UserMenuComponent)
        .component('blipFooter', <IComponentOptions>BlipFooterComponent)
        .directive('pageHeader', PageHeaderDirective.factory)
        .directive('onErrorSrc', OnErrorSrcDirective.factory);
    })((<any>window).angular);
