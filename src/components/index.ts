import angular from 'core/angular';
import { accordion } from './accordion';
import { AnalysisInfoComponent } from './analysisInfo/analysisInfo.component';
import { AvatarComponent } from './avatar/Avatar.component';
import { AvatarArrayComponent } from './avatarArray/AvatarArray.component';
import { ActionsBarComponent } from './actionsBar/actionsBar.component';
import { AddRemoveComponent } from './addRemove/addRemove.component';
import { BlipCarouselComponent } from './blipCarousel/blipCarousel.component';
import { BlipCheckboxComponent } from './blipCheckbox/blipCheckbox.component';
import { BlipDaterangePickerComponent } from './blipDaterangePicker/blipDaterangePicker.component';
import { BlipFooterComponent } from './blipFooter/blipFooter.component';
import { BlipInputDprComponent } from './blipInputDpr/blipInputDpr.component';
import { BlipInputComponent } from './blipInput/blipInput.component';
import { BlipLoadingComponent } from './blipLoading/blipLoading.component';
import { BlipMultipleInputComponent } from './blipMultipleInput/blipMultipleInput.component';
import { BlipRadioComponent } from './blipRadio/blipRadio.component';
import { BlipSelectComponent } from './blipSelect/blipSelect.component';
import { BlipTableComponent } from './blipTable/blipTable.component';
import { BlipTagsComponent } from './blipTags/blipTags.component';
import { BlipTextareaComponent } from './blipTextarea/blipTextarea.component';
import { BuilderSearchComponent } from './builderSearch/builderSearch.component';
import { CardComponent } from './card/card.component';
import { Checkbox } from './checkbox/checkbox.components';
import { ChipsComponent } from './chips/chips.component';
import { colorPicker } from './colorPicker/colorPicker.component';
import { ColumnComponent } from './blipTable/column';
import { ConfusionMatrixComponent } from './confusionMatrix/confusionMatrix.component';
import { contentBoxes } from './contentBoxes';
import { ContentTabsComponent } from './contentTabs';
import { CustomSelectComponent } from './customSelect/customSelect.component';
import { DateRangePickerComponent } from './dateRangePicker/dateRangePicker.component';
import { dropdownItem } from './dropdownItem';
import { editableInput } from './editableInput';
import { expandable } from './expandable';
import { ExpandableContentComponent } from './expandableContent/expandableContent.component';
import { ExpandableItem } from './expandableList/expandableItem';
import { ExpandableList } from './expandableList/expandableList.component';
import { FileUpload } from './fileUpload/fileUpload.component';
import { FilterByComponent } from './filterBy/filterBy.component';
import { formField } from './formField';
import { iconButton } from './iconButton';
import { IconComponent } from './icon/icon.component';
import { iconDpr } from './icon-dpr';
import { ImpactCircleComponent } from './impactCircle/impactCircle.component';
import { InfoHeader } from './infoHeader/infoHeader.component';
import { InputClipboardComponent } from './inputClipboard/inputClipboard.component';
import { inputList } from './inputList';
import { KeyValueComponent } from './keyValue/keyValue.component';
import { KeyValueItemComponent } from './keyValue/keyValueItem.component';
import { letterAvatar } from './letterAvatar';
import { ListItemComponent } from './listItem/listItem.component';
import { ListItemsComponent } from './listItems/listItems.component';
import { LoadingIconComponent } from './loadingIcon/loadingIcon.component';
import { LocalLoadingComponent } from './loading/localLoading.component';
import { MessageAreaComponent } from './messageArea/messageArea.component';
import { PageHelpComponent } from './pageHelp/pageHelp.component';
import { ReloadButtonComponent } from './reloadButton/ReloadButton.component';
import { Radio } from './radio/radio.components';
import { savingState } from './savingState/savingState.component';
import { ScrollContentComponent } from './scrollContent';
import { SearchInputComponent } from './searchInput/searchInput.component';
import { SelectItemComponent } from './customSelect/selectItem/selectItem.component';
import { sidenavMenu } from './sidenavMenu';
import { sidenavMenuItem } from './sidenavMenuItem';
import { SortinArrowsComponent } from './sortingArrows/sortingArrows.component';
import { StatusBarComponent } from './statusBar/statusBar.component';
import { SubheaderIconsComponent } from './subheaderIcons/subheaderIcons.component';
import { SwitchComponent } from './switch';
import { TabComponent } from './contentTabs/tab';
import { ThreadMessagesComponent } from './threadMessages/threadMessages.component';
import { TimepickerComponent } from './timepicker';
import { ToggleButtonComponent } from './toggleButton';
import { TooltipButtonComponent } from './tooltipButton/tooltipButton.component';
import { ViewMoreBarComponent } from './viewMoreBar/viewMoreBar.component';

export const ComponentsModule = angular
    .module('ComponentsModule', [
        accordion,
        AnalysisInfoComponent,
        AvatarComponent,
        AvatarArrayComponent,
        ActionsBarComponent,
        AddRemoveComponent,
        BlipCarouselComponent,
        BlipCheckboxComponent,
        BlipDaterangePickerComponent,
        BlipFooterComponent,
        BlipInputDprComponent,
        BlipInputComponent,
        BlipLoadingComponent,
        BlipMultipleInputComponent,
        BlipRadioComponent,
        BlipSelectComponent,
        BlipTableComponent,
        BlipTagsComponent,
        BlipTextareaComponent,
        BuilderSearchComponent,
        CardComponent,
        Checkbox,
        ChipsComponent,
        colorPicker,
        ColumnComponent,
        ConfusionMatrixComponent,
        contentBoxes,
        ContentTabsComponent,
        CustomSelectComponent,
        DateRangePickerComponent,
        dropdownItem,
        editableInput,
        expandable,
        ExpandableContentComponent,
        ExpandableItem,
        ExpandableList,
        FileUpload,
        FilterByComponent,
        formField,
        iconButton,
        IconComponent,
        iconDpr,
        ImpactCircleComponent,
        InfoHeader,
        InputClipboardComponent,
        inputList,
        KeyValueComponent,
        KeyValueItemComponent,
        letterAvatar,
        ListItemComponent,
        ListItemsComponent,
        LoadingIconComponent,
        LocalLoadingComponent,
        MessageAreaComponent,
        PageHelpComponent,
        ReloadButtonComponent,
        Radio,
        savingState,
        ScrollContentComponent,
        SearchInputComponent,
        SelectItemComponent,
        sidenavMenu,
        sidenavMenuItem,
        SortinArrowsComponent,
        StatusBarComponent,
        SubheaderIconsComponent,
        SwitchComponent,
        TabComponent,
        ThreadMessagesComponent,
        TimepickerComponent,
        ToggleButtonComponent,
        TooltipButtonComponent,
        ViewMoreBarComponent
    ])
    .name;
